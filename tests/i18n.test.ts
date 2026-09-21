import test from 'node:test';
import assert from 'node:assert/strict';
import { translate } from '../lib/i18n.ts';
import { team } from '../lib/team.ts';
test('expert names preserve Hungarian order and use explicit English order', () => {
  assert.equal(translate('Dr. Kónya János', 'hu'), 'Dr. Kónya János');
  assert.equal(translate('Dr. Kónya János', 'en'), 'Dr. János Kónya');
  assert.equal(translate('Dr. Tálos Mariann', 'en'), 'Dr. Mariann Tálos');
  for (const p of team) {
    assert.equal(translate(p.name, 'hu'), p.name);
    assert.notEqual(translate(p.name, 'en'), p.name);
  }
});
test('fees remain reimbursement fees and dynamic references survive translation', () => {
  assert.equal(translate('Térítési díjak', 'en'), 'Reimbursement fees');
  assert.equal(
    translate('Az igénylést rögzítettük. Azonosító: ABC-123', 'en'),
    'Your request has been recorded. Reference: ABC-123',
  );
  assert.equal(translate('Dr. Unlisted Person', 'en'), 'Dr. Unlisted Person');
  assert.equal(
    translate(' Táti kutya története ', 'en'),
    " Táti the dog's story ",
  );
});
