// Server-only source reference values. These are EUR, never HUF order fees.
// Source: https://intissue.com/animal, public application bundle, 2026-09-09.
export const veterinaryReferenceFees = {
  currency: 'EUR' as const,
  checked: '2026-09-09',
  fees: [
    { id: 1, amount: 120 },
    { id: 2, amount: 175 },
    { id: 3, amount: 285 },
    { id: 4, amount: 90 },
    { id: 5, amount: 265 },
    { id: 6, amount: 90 },
    { id: 7, amount: 265 },
    { id: 8, amount: 105 },
    { id: 9, amount: 165 },
    { id: 10, amount: 50 },
    { id: 11, amount: 90 },
    { id: 12, amount: 130 },
    { id: 13, amount: 170 },
    { id: 14, amount: 50 },
    { id: 15, amount: 90 },
  ],
};
