import { veterinaryReferenceFees } from '@/lib/veterinary-fees';
import { cookies } from 'next/headers';
import { rawDb } from '@/db';
import { getChatGPTUser } from '@/app/chatgpt-auth';
import {
  SESSION_COOKIE,
  hashToken,
  json,
  HttpError,
  identity,
  activeSession,
  doctorFor,
  approved,
  isAdmin,
  requireAdmin,
  requireDoctor,
  body,
} from '@/lib/server';
import {
  IDLE_MS,
  ABSOLUTE_MS,
  validateRegistration,
  parseValidUntil,
} from '@/lib/policy';
import { validSkus } from '@/lib/products';
export const dynamic = 'force-dynamic';
type Context = { params: Promise<{ action: string }> };
async function wrap(fn: () => Promise<Response>) {
  try {
    return await fn();
  } catch (e) {
    if (e instanceof HttpError) return json({ error: e.message }, e.status);
    console.error(
      'Portal operation failed',
      e instanceof Error ? e.message : 'unknown',
    );
    return json(
      { error: 'A művelet most nem sikerült. Kérjük, próbálja újra.' },
      503,
    );
  }
}
export async function GET(req: Request, ctx: Context) {
  return wrap(async () => {
    const { action } = await ctx.params;
    if (action === 'status') {
      const user = await getChatGPTUser();
      if (!user) return json({ signedIn: false, active: false });
      try {
        const { session } = await activeSession();
        const doctor = await doctorFor(user.userId);
        return json({
          signedIn: true,
          active: true,
          email: user.email,
          doctor,
          approved: approved(doctor),
          admin: isAdmin(user.email),
          expiresAt: Math.min(
            session.last_activity + IDLE_MS,
            session.created_at + ABSOLUTE_MS,
          ),
        });
      } catch (e) {
        if (e instanceof HttpError && e.status === 401)
          return json({ signedIn: true, active: false });
        throw e;
      }
    }
    if (action === 'veterinary-fees') {
      await requireDoctor();
      return json(veterinaryReferenceFees);
    }
    if (action === 'fees') {
      await requireDoctor();
      return json({
        fees: (await rawDb().prepare('SELECT sku, amount FROM fees').all())
          .results,
      });
    }
    if (action === 'requests') {
      const { user } = await requireDoctor();
      return json({
        requests: (
          await rawDb()
            .prepare(
              'SELECT id,sku,quantity,fee,created_at FROM requests WHERE user_id=? ORDER BY created_at DESC LIMIT 50',
            )
            .bind(user.userId)
            .all()
        ).results,
      });
    }
    if (action === 'admin') {
      await requireAdmin();
      return json({
        doctors: (
          await rawDb()
            .prepare('SELECT * FROM doctors ORDER BY created_at DESC LIMIT 200')
            .all()
        ).results,
        fees: (await rawDb().prepare('SELECT sku,amount FROM fees').all())
          .results,
        requests: (
          await rawDb()
            .prepare(
              'SELECT r.id,r.sku,r.quantity,r.fee,r.created_at,d.full_name,d.email,d.institution FROM requests r JOIN doctors d ON d.user_id=r.user_id ORDER BY r.created_at DESC LIMIT 100',
            )
            .all()
        ).results,
      });
    }
    return json({ error: 'Nem található.' }, 404);
  });
}
export async function POST(req: Request, ctx: Context) {
  return wrap(async () => {
    const { action } = await ctx.params;
    const input = await body(req);
    const now = Date.now();
    const db = rawDb();
    if (action === 'session') {
      const user = await identity();
      const token = crypto.randomUUID() + crypto.randomUUID();
      const tokenHash = await hashToken(token);
      await db.batch([
        db
          .prepare(
            'DELETE FROM sessions WHERE user_id=? OR last_activity<=? OR created_at<=?',
          )
          .bind(user.userId, now - IDLE_MS, now - ABSOLUTE_MS),
        db
          .prepare(
            'INSERT INTO sessions(token_hash,user_id,last_activity,created_at) VALUES(?,?,?,?)',
          )
          .bind(tokenHash, user.userId, now, now),
      ]);
      (await cookies()).set(SESSION_COOKIE, token, {
        httpOnly: true,
        secure: new URL(req.url).protocol === 'https:',
        sameSite: 'strict',
        path: '/',
        maxAge: ABSOLUTE_MS / 1000,
      });
      return json({ ok: true, expiresAt: now + IDLE_MS });
    }
    if (action === 'logout') {
      const user = await getChatGPTUser();
      const token = (await cookies()).get(SESSION_COOKIE)?.value;
      if (user && token)
        await db
          .prepare('DELETE FROM sessions WHERE token_hash=? AND user_id=?')
          .bind(await hashToken(token), user.userId)
          .run();
      (await cookies()).delete(SESSION_COOKIE);
      return json({ ok: true });
    }
    if (action === 'activity') {
      const { tokenHash, user } = await activeSession();
      const updated = await db
        .prepare(
          'UPDATE sessions SET last_activity=? WHERE token_hash=? AND user_id=? AND last_activity>? AND created_at>? RETURNING last_activity, created_at',
        )
        .bind(now, tokenHash, user.userId, now - IDLE_MS, now - ABSOLUTE_MS)
        .first<{ last_activity: number; created_at: number }>();
      if (!updated) throw new HttpError(401, 'A munkamenet lejárt.');
      return json({
        expiresAt: Math.min(
          updated.last_activity + IDLE_MS,
          updated.created_at + ABSOLUTE_MS,
        ),
      });
    }
    if (action === 'register') {
      const { user } = await activeSession();
      let data;
      try {
        data = validateRegistration(input);
      } catch (e) {
        throw new HttpError(400, (e as Error).message);
      }
      const existing = await doctorFor(user.userId);
      if (existing)
        throw new HttpError(409, 'Ehhez a fiókhoz már tartozik regisztráció.');
      await db
        .prepare(
          'INSERT INTO doctors(user_id,email,full_name,stamp,institution,status,created_at) VALUES(?,?,?,?,?,?,?)',
        )
        .bind(
          user.userId,
          user.email,
          data.fullName,
          data.stamp,
          data.institution,
          'pending',
          now,
        )
        .run();
      return json({ ok: true, status: 'pending' }, 201);
    }
    if (action === 'review') {
      const { user } = await requireAdmin();
      if (input.userId === user.userId)
        throw new HttpError(403, 'Saját regisztráció nem hagyható jóvá.');
      if (
        typeof input.userId !== 'string' ||
        !['approved', 'rejected'].includes(String(input.decision))
      )
        throw new HttpError(400, 'Érvénytelen döntés.');
      if (
        typeof input.note !== 'string' ||
        input.note.trim().length < 10 ||
        input.note.length > 1500
      )
        throw new HttpError(400, 'Rögzítse az ellenőrzés eredményét.');
      if (!(await doctorFor(input.userId)))
        throw new HttpError(404, 'A regisztráció nem található.');
      let validUntil: number | null = null;
      if (input.decision === 'approved') {
        if (
          input.registryConfirmed !== true ||
          input.identityConfirmed !== true
        )
          throw new HttpError(
            400,
            'A nyilvántartási és személyazonossági ellenőrzés is szükséges.',
          );
        try {
          validUntil = parseValidUntil(input.validUntil);
        } catch (e) {
          throw new HttpError(400, (e as Error).message);
        }
        const duplicate = await db
          .prepare(
            "SELECT user_id FROM doctors WHERE stamp=(SELECT stamp FROM doctors WHERE user_id=?) AND status='approved' AND user_id<>?",
          )
          .bind(input.userId, input.userId)
          .first();
        if (duplicate)
          throw new HttpError(
            409,
            'Ezzel a pecsétszámmal már van jóváhagyott fiók.',
          );
      }
      await db.batch([
        db
          .prepare(
            'UPDATE doctors SET status=?,valid_until=?,review_note=? WHERE user_id=?',
          )
          .bind(input.decision, validUntil, input.note.trim(), input.userId),
        db
          .prepare(
            'INSERT INTO reviews(id,doctor_id,reviewer_id,decision,note,valid_until,created_at) VALUES(?,?,?,?,?,?,?)',
          )
          .bind(
            crypto.randomUUID(),
            input.userId,
            user.userId,
            input.decision,
            input.note.trim(),
            validUntil,
            now,
          ),
      ]);
      return json({ ok: true });
    }
    if (action === 'fee') {
      const { user } = await requireAdmin();
      if (
        typeof input.sku !== 'string' ||
        !validSkus.includes(input.sku) ||
        !Number.isSafeInteger(input.amount) ||
        Number(input.amount) < 0 ||
        Number(input.amount) > 100000000
      )
        throw new HttpError(
          400,
          'Érvényes cikkszám és egész forintban megadott térítési díj szükséges.',
        );
      await db
        .prepare(
          'INSERT INTO fees(sku,amount,updated_at,updated_by) VALUES(?,?,?,?) ON CONFLICT(sku) DO UPDATE SET amount=excluded.amount,updated_at=excluded.updated_at,updated_by=excluded.updated_by',
        )
        .bind(input.sku, input.amount, now, user.userId)
        .run();
      return json({ ok: true });
    }
    if (action === 'request') {
      const { user } = await requireDoctor();
      if (
        typeof input.sku !== 'string' ||
        !validSkus.includes(input.sku) ||
        !Number.isInteger(input.quantity) ||
        Number(input.quantity) < 1 ||
        Number(input.quantity) > 100
      )
        throw new HttpError(
          400,
          'Válasszon változatot és 1–100 közötti mennyiséget.',
        );
      if (
        typeof input.requestId !== 'string' ||
        !/^[-a-f0-9]{36}$/.test(input.requestId)
      )
        throw new HttpError(400, 'Hiányzó igénylésazonosító.');
      const existing = await db
        .prepare('SELECT id,user_id FROM requests WHERE id=?')
        .bind(input.requestId)
        .first<{ id: string; user_id: string }>();
      if (existing) {
        if (existing.user_id !== user.userId)
          throw new HttpError(409, 'Foglalt azonosító.');
        return json({ ok: true, id: existing.id });
      }
      const fee = await db
        .prepare('SELECT amount FROM fees WHERE sku=?')
        .bind(input.sku)
        .first<{ amount: number }>();
      if (!fee)
        throw new HttpError(
          409,
          'Ehhez a változathoz még nincs rögzített térítési díj.',
        );
      if (input.fee !== fee.amount)
        throw new HttpError(
          409,
          'A térítési díj megváltozott. Frissítse az adatlapot.',
        );
      await db
        .prepare(
          'INSERT INTO requests(id,user_id,sku,quantity,fee,created_at) VALUES(?,?,?,?,?,?)',
        )
        .bind(
          input.requestId,
          user.userId,
          input.sku,
          input.quantity,
          fee.amount,
          now,
        )
        .run();
      return json({ ok: true, id: input.requestId }, 201);
    }
    return json({ error: 'Nem található.' }, 404);
  });
}
