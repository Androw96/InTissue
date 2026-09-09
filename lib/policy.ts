export const IDLE_MS = 120_000;
export const ABSOLUTE_MS = 8 * 60 * 60 * 1000;
export function sessionIsActive(
  lastActivity: number,
  createdAt: number,
  now = Date.now(),
) {
  return (
    Number.isFinite(lastActivity) &&
    Number.isFinite(createdAt) &&
    lastActivity <= now &&
    createdAt <= lastActivity &&
    now - lastActivity < IDLE_MS &&
    now - createdAt < ABSOLUTE_MS
  );
}
export function professionalIsActive(
  profile: { status: string; validUntil: number | null } | null,
  now = Date.now(),
) {
  return (
    !!profile &&
    profile.status === 'approved' &&
    typeof profile.validUntil === 'number' &&
    profile.validUntil > now
  );
}
export function validateRegistration(input: Record<string, unknown>) {
  const fullName =
    typeof input.fullName === 'string' ? input.fullName.trim() : '';
  const stamp = typeof input.stamp === 'string' ? input.stamp.trim() : '';
  const institution =
    typeof input.institution === 'string' ? input.institution.trim() : '';
  if (
    fullName.length < 5 ||
    fullName.length > 160 ||
    !/^\p{L}[\p{L}\p{M} .’'\-]+$/u.test(fullName)
  )
    throw new Error('Adja meg a teljes orvosi nevét.');
  if (!/^\d{1,10}$/.test(stamp))
    throw new Error(
      'A pecsétszám csak számjegyekből állhat (legfeljebb 10 számjegy).',
    );
  if (institution.length < 3 || institution.length > 200)
    throw new Error('Adja meg az intézmény vagy rendelő nevét.');
  if (input.confirmed !== true)
    throw new Error('Erősítse meg a megadott adatok helyességét.');
  return { fullName, stamp, institution };
}
export function parseValidUntil(value: unknown, now = Date.now()) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value))
    throw new Error('Adja meg a működési nyilvántartás érvényességi dátumát.');
  const ms = Date.parse(value + 'T00:00:00Z');
  if (!Number.isFinite(ms) || new Date(ms).toISOString().slice(0, 10) !== value)
    throw new Error('Érvénytelen dátum.');
  // Budapest end of the selected day, accounting for winter/summer time.
  const next = ms + 86400000;
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Budapest',
    hour: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date(next));
  const offset =
    Number(parts.find((p) => p.type === 'hour')?.value || 0) * 3600000;
  const until = next - offset;
  if (until <= now)
    throw new Error('Lejárt működési nyilvántartás nem hagyható jóvá.');
  return until;
}
