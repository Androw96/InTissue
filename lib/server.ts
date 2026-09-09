import { cookies } from 'next/headers';
import { getChatGPTUser } from '@/app/chatgpt-auth';
import { rawDb, adminEmails } from '@/db';
import { sessionIsActive, professionalIsActive } from './policy';
export const SESSION_COOKIE = 'intissue_session';
export type Doctor = {
  user_id: string;
  email: string;
  full_name: string;
  stamp: string;
  institution: string;
  status: string;
  valid_until: number | null;
  review_note: string | null;
};
export async function hashToken(value: string) {
  const bytes = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(value),
  );
  return Array.from(new Uint8Array(bytes), (b) =>
    b.toString(16).padStart(2, '0'),
  ).join('');
}
export function json(value: unknown, status = 200) {
  return Response.json(value, {
    status,
    headers: {
      'Cache-Control': 'no-store, private',
      Vary: 'Cookie',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}
export async function identity() {
  const user = await getChatGPTUser();
  if (!user) throw new HttpError(401, 'Először jelentkezzen be.');
  return user;
}
export async function activeSession() {
  const user = await identity();
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) throw new HttpError(401, 'A szakmai munkamenet nincs megnyitva.');
  const tokenHash = await hashToken(token);
  const session = await rawDb()
    .prepare(
      'SELECT user_id, last_activity, created_at FROM sessions WHERE token_hash=?',
    )
    .bind(tokenHash)
    .first<{ user_id: string; last_activity: number; created_at: number }>();
  if (
    !session ||
    session.user_id !== user.userId ||
    !sessionIsActive(session.last_activity, session.created_at)
  )
    throw new HttpError(401, 'A munkamenet lejárt. Jelentkezzen be újra.');
  return { user, tokenHash, session };
}
export async function doctorFor(userId: string) {
  return rawDb()
    .prepare('SELECT * FROM doctors WHERE user_id=?')
    .bind(userId)
    .first<Doctor>();
}
export function approved(profile: Doctor | null) {
  return professionalIsActive(
    profile
      ? { status: profile.status, validUntil: profile.valid_until }
      : null,
  );
}
export function isAdmin(email: string) {
  return adminEmails().includes(email.toLowerCase());
}
export async function requireAdmin() {
  const session = await activeSession();
  if (!isAdmin(session.user.email))
    throw new HttpError(403, 'Adminisztrátori jogosultság szükséges.');
  return session;
}
export async function requireDoctor() {
  const session = await activeSession();
  const profile = await doctorFor(session.user.userId);
  if (!approved(profile))
    throw new HttpError(
      403,
      'Érvényes, jóváhagyott orvosi regisztráció szükséges.',
    );
  return session;
}
export async function body(req: Request) {
  if (req.headers.get('origin') !== new URL(req.url).origin)
    throw new HttpError(403, 'Érvénytelen kérési eredet.');
  if (!req.headers.get('content-type')?.includes('application/json'))
    throw new HttpError(415, 'JSON kérés szükséges.');
  const text = await req.text();
  if (text.length > 8192) throw new HttpError(413, 'Túl hosszú kérés.');
  try {
    const parsed = JSON.parse(text);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed))
      throw new Error();
    return parsed as Record<string, unknown>;
  } catch {
    throw new HttpError(400, 'Érvénytelen kérés.');
  }
}
