import test from 'node:test';
import assert from 'node:assert/strict';
import {
  sessionIsActive,
  professionalIsActive,
  validateRegistration,
  parseValidUntil,
} from '../lib/policy.ts';
const now = Date.parse('2026-09-09T10:00:00Z');
test('inactivity expires exactly at two minutes', () => {
  assert.equal(sessionIsActive(now - 119999, now - 200000, now), true);
  assert.equal(sessionIsActive(now - 120000, now - 200000, now), false);
  assert.equal(sessionIsActive(now - 120001, now - 200000, now), false);
});
test('future and absolute-expired session cannot pass', () => {
  assert.equal(sessionIsActive(now + 1, now, now), false);
  assert.equal(sessionIsActive(now, now - 8 * 3600000, now), false);
  assert.equal(sessionIsActive(NaN, now, now), false);
});
test('pending, rejected and expired doctors never pass the fee gate', () => {
  for (const status of ['pending', 'rejected', 'approved'])
    assert.equal(professionalIsActive({ status, validUntil: now }, now), false);
  assert.equal(
    professionalIsActive({ status: 'pending', validUntil: now + 1000 }, now),
    false,
  );
  assert.equal(
    professionalIsActive({ status: 'approved', validUntil: now + 1000 }, now),
    true,
  );
  assert.equal(professionalIsActive(null, now), false);
});
test('stamp format is checked without ever approving a registration', () => {
  const d = validateRegistration({
    fullName: 'Dr. Teszt Elek',
    stamp: '12345',
    institution: 'Teszt Klinika',
    confirmed: true,
  });
  assert.equal(d.stamp, '12345');
  assert.equal('status' in d, false);
  assert.throws(() =>
    validateRegistration({
      fullName: 'Dr. Teszt Elek',
      stamp: '1e5',
      institution: 'Teszt Klinika',
      confirmed: true,
    }),
  );
  assert.throws(() =>
    validateRegistration({
      fullName: 'Dr. Teszt Elek',
      stamp: '12345',
      institution: 'Teszt Klinika',
      confirmed: false,
    }),
  );
});
test('validity dates reject impossible dates and use Budapest day end', () => {
  assert.throws(() => parseValidUntil('2026-02-30', now));
  assert.throws(() => parseValidUntil('2026-01-01', now));
  assert.equal(
    parseValidUntil('2026-09-09', now),
    Date.parse('2026-09-09T22:00:00Z'),
  );
  assert.equal(
    parseValidUntil('2026-12-09', now),
    Date.parse('2026-12-09T23:00:00Z'),
  );
});
