export const veterinarySource = {
  url: 'https://intissue.com/animal',
  home: 'https://intissue.com/',
  checked: '2026-09-09',
};
export const veterinaryProducts = [
  {
    id: 'bmg',
    name: 'BMG – Bone Matrix Gelatin',
    type: 'Csontmátrix-koncentrátum',
    origin: 'Ló- és kutyaeredetű változatok',
    image: '/products/intissue/bmg.webp',
    summary: 'Finom és ultrafinom szemcseméretű csontmátrix.',
    detail:
      'Az InTissue leírása szerint corticalis csontból előállított, részlegesen dekalcinált, fagyasztva szárított és sterilizált csontmátrix-koncentrátum. Az alábbi kiszerelések az állatgyógyászati terméktáblázatban szerepelnek.',
    variants: [
      { id: 1, label: 'Kutyaeredetű · finom', pack: '1 cm³' },
      { id: 2, label: 'Kutyaeredetű · finom', pack: '2 cm³' },
      { id: 3, label: 'Kutyaeredetű · finom', pack: '4 cm³' },
      { id: 4, label: 'Lóeredetű · ultrafinom', pack: '1 cm³' },
      { id: 5, label: 'Lóeredetű · ultrafinom', pack: '4 cm³' },
      { id: 6, label: 'Lóeredetű · finom', pack: '1 cm³' },
      { id: 7, label: 'Lóeredetű · finom', pack: '4 cm³' },
    ],
  },
  {
    id: 'chips',
    name: 'Corticocancellous Chips',
    type: 'Corticospongiosus csontszemcsék',
    origin: 'Ló- és kutyaeredetű termékcsalád',
    image: '/products/intissue/chips.webp',
    summary: 'Szemcsés csontmátrix, BMG-vel is kombinálható.',
    detail:
      'A gyártói ismertető részlegesen dekalcinált, fagyasztva szárított csontmátrix-szemcséket mutat be. A termékcsalád ló- és kutyaeredetű változatokat említ; a közölt kiszerelési táblázatban az alábbi kutyaeredetű tételek találhatók.',
    variants: [
      { id: 8, label: 'Kutyaeredetű · ultrafinom', pack: '1 cm³' },
      { id: 9, label: 'Kutyaeredetű · ultrafinom', pack: '2 cm³' },
    ],
  },
  {
    id: 'specialty',
    name: 'Specialty Grafts',
    type: 'Strukturális csontblokkok',
    origin: 'Lóeredetű csont',
    image: '/products/intissue/specialty.webp',
    summary: 'Spongiosus és corticospongiosus blokkok.',
    detail:
      'Az InTissue strukturális graftjai spongiosus és corticospongiosus blokkformákban érhetők el. A forrás egyedi és túlméretes kiviteleknél külön egyeztetést ír elő. A lenti méretek a közölt terméktáblázatot követik.',
    variants: [
      { id: 10, label: 'Spongiosus · 10 × 10 × 10 mm', pack: '1 cm³' },
      { id: 11, label: 'Spongiosus · 20 × 10 × 10 mm', pack: '2 cm³' },
      { id: 12, label: 'Spongiosus · 30 × 10 × 10 mm', pack: '3 cm³' },
      { id: 13, label: 'Spongiosus · 40 × 10 × 10 mm', pack: '4 cm³' },
      { id: 14, label: 'Corticospongiosus · 10 × 10 × 10 mm', pack: '1 cm³' },
      { id: 15, label: 'Corticospongiosus · 20 × 10 × 10 mm', pack: '2 cm³' },
    ],
  },
];
