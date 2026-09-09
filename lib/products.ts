export const products = [
  {
    id: 'spongiosa',
    name: 'Spongiosa kockák és blokkok',
    original: 'SPONGIOSA-WÜRFEL UND -BLÖCKE',
    type: 'Spongiosus csont',
    image: '/products/spongiosa.jpg',
    summary: 'Kocka és blokk formák, több térfogatban.',
    detail:
      'Fagyasztva szárított spongiosa kockák és blokkok. A pontos kiszerelést a gyártói cikkszám azonosítja.',
    source: 'https://dizg.de/gewebetransplantat/spongiosa-wuerfel-und-bloecke/',
    variants: [
      { sku: 'GT2601', label: '1 cm³ · 1 kocka' },
      { sku: 'GT2609', label: '3 cm³ · 1 blokk' },
      { sku: 'GT2604', label: '9 cm³ · 1 blokk' },
      { sku: 'GT2600', label: '12 cm³ · 1 blokk' },
      { sku: 'GT2605', label: '15 cm³ · 1 blokk' },
    ],
  },
  {
    id: 'ilium',
    name: 'Os ilium csontblokkok',
    original: 'OS ILIUM',
    type: 'Corticospongiosus csont',
    image: '/products/ilium.jpg',
    summary: 'Bi- és tricorticalis csontblokk-változatok.',
    detail:
      'Fagyasztva szárított csípőcsontblokkok. A katalógus az alábbi bicorticalis és tricorticalis változatokat mutatja be.',
    source: 'https://dizg.de/gewebetransplantat/os-ilium/',
    variants: [
      { sku: 'GT2704', label: 'Bicorticalis · 20 × 20 mm' },
      { sku: 'GT2706', label: 'Bicorticalis · 20 × 40 mm' },
      { sku: 'GT2714', label: 'Tricorticalis · 20 × 20 mm' },
      { sku: 'GT2715', label: 'Tricorticalis · 20 × 30 mm' },
      { sku: 'GT2716', label: 'Tricorticalis · 20 × 40 mm' },
    ],
  },
  {
    id: 'wedge',
    name: 'Osteotomiás ékek',
    original: 'OSTEOTOMIE-KEILE',
    type: 'Strukturális csont',
    image: '/products/wedge.jpg',
    summary: 'Femurfej- és corticospongiosus ékek.',
    detail:
      'Fagyasztva szárított csontékek. A corticospongiosus változat mérete 25–30 × 15 × 15 mm.',
    source: 'https://dizg.de/en/allograft/osteotomy-wedges/',
    variants: [
      { sku: 'GT2001', label: 'Femurfej-ék · 22,5°' },
      { sku: 'GT2002', label: 'Femurfej-ék · 45°' },
      { sku: 'GT2727', label: 'Corticospongiosus · 25–30 × 15 × 15 mm' },
    ],
  },
];
export const validSkus = products.flatMap((p) => p.variants.map((v) => v.sku));
export type Product = (typeof products)[number];
