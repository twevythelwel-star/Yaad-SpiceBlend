// The product catalogue. Each spice is rendered as a <SpiceCard />.
// heat = relative Scoville-ish weight used by the live HeatMeter.
// price = JMD per scoop added to the blend.
export const SPICES = [
  {
    id: 'pimento',
    name: 'Pimento (Allspice)',
    note: 'The backbone of jerk. Warm, woody, sweet.',
    heat: 0,
    price: 1200,
    tag: 'base',
  },
  {
    id: 'scotch-bonnet',
    name: 'Scotch Bonnet',
    note: 'The fire. Fruity, floral, and seriously hot.',
    heat: 9,
    price: 1800,
    tag: 'heat',
  },
  {
    id: 'thyme',
    name: 'Wild Thyme',
    note: 'Earthy and green. Cools the bonnet down.',
    heat: 0,
    price: 90,
    tag: 'herb',
  },
  {
    id: 'escallion',
    name: 'Escallion',
    note: 'Sharp spring-onion bite. Classic yard flavour.',
    heat: 1,
    price: 900,
    tag: 'herb',
  },
  {
    id: 'ginger',
    name: 'Ginger',
    note: 'Bright, peppery warmth without the burn.',
    heat: 3,
    price: 1100,
    tag: 'warm',
  },
  {
    id: 'black-pepper',
    name: 'Black Pepper',
    note: 'Slow, rounded heat that builds.',
    heat: 4,
    price: 800,
    tag: 'warm',
  },
  {
    id: 'cinnamon',
    name: 'Cinnamon',
    note: 'A whisper of sweet spice. Use light.',
    heat: 0,
    price: 1300,
    tag: 'sweet',
  },
  {
    id: 'nutmeg',
    name: 'Nutmeg',
    note: 'Nutty depth. Grown right here in the hills.',
    heat: 0,
    price: 1400,
    tag: 'sweet',
  },
]

// Heat label shown to the user, derived from total heat score.
export function heatLabel(score) {
  if (score <= 0) return 'No heat'
  if (score <= 6) return 'Mild'
  if (score <= 14) return 'Warm'
  if (score <= 24) return 'Hot'
  return 'Scorcha'
}

// A bit of personality: name the blend from its make-up.
export function blendPersonality(items) {
  if (items.length === 0) return null
  const heat = items.reduce((s, i) => s + i.heat * i.qty, 0)
  const hasBonnet = items.some((i) => i.id === 'scotch-bonnet')
  const herby = items.filter((i) => i.tag === 'herb').length >= 2
  if (heat > 24) return 'Firestarter'
  if (hasBonnet && herby) return 'Sunday Yard Cook'
  if (herby) return 'Green & Easy'
  if (heat === 0) return 'Sweet Smoke'
  return 'House Jerk'
}
