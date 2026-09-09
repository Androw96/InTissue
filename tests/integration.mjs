import { DatabaseSync } from 'node:sqlite';
import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
const db = new DatabaseSync(process.argv[2]);
if (
  !db
    .prepare(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='doctors'",
    )
    .get()
)
  db.exec(readFileSync('drizzle/0000_charming_speed_demon.sql', 'utf8'));
const base = 'http://localhost:3000';
let cookies = new Map();
let passed = 0;
async function request(path, input, origin = base) {
  const r = await fetch(base + path, {
    redirect: 'manual',
    method: input === undefined ? 'GET' : 'POST',
    headers: {
      Cookie: [...cookies].map(([k, v]) => `${k}=${v}`).join('; '),
      ...(input === undefined
        ? {}
        : { 'Content-Type': 'application/json', Origin: origin }),
    },
    body: input === undefined ? undefined : JSON.stringify(input),
  });
  for (const c of r.headers.getSetCookie()) {
    const part = c.split(';')[0];
    const pos = part.indexOf('=');
    cookies.set(part.slice(0, pos), part.slice(pos + 1));
  }
  return r;
}
function ok(name) {
  passed++;
  console.log('PASS ' + name);
}
const cleanup = () => {
  db.prepare("DELETE FROM requests WHERE user_id='local_seedy'").run();
  db.prepare("DELETE FROM doctors WHERE user_id='local_seedy'").run();
  db.prepare("DELETE FROM sessions WHERE user_id='local_seedy'").run();
  db.prepare("DELETE FROM fees WHERE updated_by='integration-test'").run();
};
cleanup();
try {
  let r = await request('/api/portal/fees');
  assert.equal(r.status, 401);
  ok('anonymous protected endpoint rejected');
  await request('/signin-with-chatgpt?return_to=%2Fregisztracio');
  r = await request('/api/portal/session', {});
  assert.equal(r.status, 200);
  assert.match(r.headers.get('set-cookie'), /HttpOnly/i);
  assert.match(r.headers.get('set-cookie'), /SameSite=Strict/i);
  ok('identity-bound HttpOnly session created');
  r = await request(
    '/api/portal/register',
    {
      fullName: 'Dr. Teszt Elek',
      stamp: '12345',
      institution: 'Kizárólag teszt rendelő',
      confirmed: true,
    },
    'https://evil.example',
  );
  assert.equal(r.status, 403);
  ok('cross-origin registration rejected');
  r = await request('/api/portal/register', {
    fullName: 'Dr. Teszt Elek',
    stamp: '1e5',
    institution: 'Teszt rendelő',
    confirmed: true,
  });
  assert.equal(r.status, 400);
  ok('invalid stamp format rejected');
  r = await request('/api/portal/register', {
    fullName: 'Dr. Teszt Elek',
    stamp: '12345',
    institution: 'Teszt rendelő',
    confirmed: true,
  });
  assert.equal(r.status, 201);
  assert.equal(
    db.prepare("SELECT status FROM doctors WHERE user_id='local_seedy'").get()
      .status,
    'pending',
  );
  ok('registration persisted as pending');
  r = await request('/api/portal/fees');
  assert.equal(r.status, 403);
  ok('pending doctor cannot access fees');
  r = await request('/api/portal/review', {
    userId: 'local_seedy',
    decision: 'approved',
  });
  assert.equal(r.status, 403);
  ok('non-admin cannot approve registrations');
  db.prepare(
    "UPDATE doctors SET status='approved',valid_until=? WHERE user_id='local_seedy'",
  ).run(Date.now() + 86400000);
  db.prepare(
    "INSERT INTO fees(sku,amount,updated_at,updated_by) VALUES('GT2601',12345,?,'integration-test') ON CONFLICT(sku) DO UPDATE SET amount=excluded.amount,updated_by=excluded.updated_by",
  ).run(Date.now());
  r = await request('/api/portal/fees');
  assert.equal(r.status, 200);
  assert.match(r.headers.get('cache-control'), /no-store/);
  assert.equal((await r.json()).fees[0].amount, 12345);
  ok('approved doctor accesses uncached fees');
  const id = crypto.randomUUID();
  const payload = { sku: 'GT2601', quantity: 2, fee: 12345, requestId: id };
  r = await request('/api/portal/request', payload);
  assert.equal(r.status, 201);
  r = await request('/api/portal/request', payload);
  assert.equal(r.status, 200);
  assert.equal(
    db.prepare('SELECT count(*) AS n FROM requests WHERE id=?').get(id).n,
    1,
  );
  ok('request saved once across retry');
  db.prepare(
    "UPDATE doctors SET valid_until=? WHERE user_id='local_seedy'",
  ).run(Date.now() - 1);
  r = await request('/api/portal/fees');
  assert.equal(r.status, 403);
  ok('expired professional qualification rejected');
  db.prepare(
    "UPDATE sessions SET last_activity=? WHERE user_id='local_seedy'",
  ).run(Date.now() - 120001);
  r = await request('/api/portal/activity', {});
  assert.equal(r.status, 401);
  r = await request('/api/portal/fees');
  assert.equal(r.status, 401);
  ok('server rejects expired session and renewal');
  r = await request('/api/portal/logout', {});
  assert.equal(r.status, 200);
  assert.equal(
    db
      .prepare("SELECT count(*) AS n FROM sessions WHERE user_id='local_seedy'")
      .get().n,
    0,
  );
  ok('logout revokes server session');
  console.log(`${passed} integration checks passed.`);
} finally {
  cleanup();
  db.close();
}
