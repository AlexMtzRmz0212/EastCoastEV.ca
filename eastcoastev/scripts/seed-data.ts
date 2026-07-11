// Curated catalog seed data for EastCoastEV.
//
// Model lineups, colors, and specs were researched from each manufacturer's
// official store (July 2026). Prices are intentionally left null so the site
// shows "Contact for price" until the owner sets dealer pricing. Specs are a
// realistic starting point — the owner should confirm/adjust before launch.
//
// `source` points at the manufacturer's Shopify store; scripts/seed.ts fetches
// live product JSON from there to pull official photos and re-host them in
// Supabase Storage (no hotlinking).

export interface SeedColor {
  name: string;
  hex: string;
}

export interface SeedProduct {
  brandSlug: string;
  categorySlug: string;
  slug: string; // our URL slug, e.g. 'niu-kqi3-pro'
  name: string;
  tagline: string;
  description: string;
  priceCents: number | null;
  isFeatured: boolean;
  specs: Record<string, string>;
  colors: SeedColor[];
  source: { store: StoreKey; handle: string };
}

export type StoreKey = 'niu' | 'eridepro' | 'yozma' | 'univelo';

export const STORE_BASE: Record<StoreKey, string> = {
  niu: 'https://niucanada.com',
  eridepro: 'https://www.eridepro.com',
  yozma: 'https://yozmasport.com',
  univelo: 'https://www.univelo.ca',
};

export const BRANDS = [
  {
    slug: 'niu',
    name: 'NIU',
    description:
      'Global leader in smart electric scooters and kick scooters, known for clean design, long range, and app-connected rides.',
    website_url: 'https://www.niu.com',
    sort_order: 1,
  },
  {
    slug: 'e-ride-pro',
    name: 'E-Ride Pro',
    description:
      'High-performance electric dirt bikes and e-motos built for off-road speed, torque, and swappable long-range batteries.',
    website_url: 'https://www.eridepro.com',
    sort_order: 2,
  },
  {
    slug: 'yozma',
    name: 'Yozma',
    description:
      'Affordable, lightweight off-road electric dirt bikes designed for teens and adults getting into electric trail riding.',
    website_url: 'https://yozmasport.com',
    sort_order: 3,
  },
  {
    slug: 'univelo',
    name: 'Univelo',
    description:
      'Exclusive Canadian distributor of AIMA e-bikes — Bafang-powered, UL-2849 certified commuter, cargo, and fat-tire rides.',
    website_url: 'https://www.univelo.ca',
    sort_order: 4,
  },
];

export const CATEGORIES = [
  { slug: 'e-bikes', name: 'E-Bikes', sort_order: 1 },
  { slug: 'e-scooters', name: 'E-Scooters', sort_order: 2 },
  { slug: 'e-dirt-bikes', name: 'E-Dirt Bikes', sort_order: 3 },
  { slug: 'e-trikes', name: 'E-Trikes & Mobility', sort_order: 4 },
];

// Reusable swatch colors
const C = {
  white: { name: 'White', hex: '#f2f2f2' },
  black: { name: 'Black', hex: '#1a1a1a' },
  blue: { name: 'Blue', hex: '#1e5bb8' },
  red: { name: 'Red', hex: '#c62828' },
  grey: { name: 'Grey', hex: '#7d7d7d' },
  gray: { name: 'Gray', hex: '#7d7d7d' },
  silver: { name: 'Silver', hex: '#c4c8cc' },
  roseGold: { name: 'Rose Gold', hex: '#b76e79' },
  sage: { name: 'Sage', hex: '#9caf88' },
  pink: { name: 'Pink', hex: '#e8a0bf' },
  chameleon: { name: 'Chameleon', hex: '#6a7fdb' },
};

export const PRODUCTS: SeedProduct[] = [
  // ── NIU ─────────────────────────────────────────────────────
  {
    brandSlug: 'niu',
    categorySlug: 'e-scooters',
    slug: 'niu-kqi2-pro',
    name: 'KQi2 Pro',
    tagline: 'The reliable everyday commuter.',
    description:
      'A dependable, no-fuss electric kick scooter with a comfortable ride and app connectivity — a great first e-scooter for getting around the city.',
    priceCents: null,
    isFeatured: false,
    specs: { Range: 'Up to 40 km', 'Top speed': '25 km/h', Motor: '300W', 'Tire size': '10"' },
    colors: [C.silver],
    source: { store: 'niu', handle: 'kqi2-electric-kick-scooter-adults' },
  },
  {
    brandSlug: 'niu',
    categorySlug: 'e-scooters',
    slug: 'niu-kqi3-sport',
    name: 'KQi3 Sport',
    tagline: 'Wide deck, easy ride.',
    description:
      'A stable, wide-deck kick scooter tuned for comfort and control on daily commutes, available in four colors.',
    priceCents: null,
    isFeatured: false,
    specs: { Range: 'Up to 40 km', 'Top speed': '28 km/h', Motor: '350W', 'Tire size': '9.5"' },
    colors: [C.white, C.black, C.blue, C.red],
    source: { store: 'niu', handle: 'kqi3-sport-electric-scooter-adults' },
  },
  {
    brandSlug: 'niu',
    categorySlug: 'e-scooters',
    slug: 'niu-kqi3-pro',
    name: 'KQi3 Pro',
    tagline: 'The best all-around e-scooter.',
    description:
      'NIU’s most popular kick scooter: a balanced blend of range, power, and portability that handles hills and long commutes with ease.',
    priceCents: null,
    isFeatured: true,
    specs: { Range: 'Up to 50 km', 'Top speed': '32 km/h', Motor: '700W peak', 'Tire size': '9.5"' },
    colors: [C.black, C.roseGold],
    source: { store: 'niu', handle: 'kqi3-pro-electric-scooter-adults' },
  },
  {
    brandSlug: 'niu',
    categorySlug: 'e-scooters',
    slug: 'niu-kqi3-max',
    name: 'KQi3 Max',
    tagline: 'More range, more power.',
    description:
      'The top of the KQi3 line — extended range and a stronger motor for riders who want to go further and climb steeper hills.',
    priceCents: null,
    isFeatured: false,
    specs: { Range: 'Up to 65 km', 'Top speed': '32 km/h', Motor: '900W peak', 'Tire size': '9.5"' },
    colors: [C.grey],
    source: { store: 'niu', handle: 'kqi3-max-electric-scooter-adults' },
  },
  {
    brandSlug: 'niu',
    categorySlug: 'e-scooters',
    slug: 'niu-kqi-air',
    name: 'KQi Air',
    tagline: 'Ultralight carbon fiber.',
    description:
      'A carbon-fiber-framed kick scooter weighing just 11.9 kg — remarkably light and portable without giving up smart features.',
    priceCents: null,
    isFeatured: true,
    specs: { Range: 'Up to 50 km', 'Top speed': '32 km/h', Weight: '11.9 kg', Frame: 'Carbon fiber' },
    colors: [C.silver, C.red],
    source: { store: 'niu', handle: 'kqi-air-electric-kick-scooter' },
  },
  {
    brandSlug: 'niu',
    categorySlug: 'e-scooters',
    slug: 'niu-kqi-300x',
    name: 'KQi 300X',
    tagline: 'Dual suspension, all terrain.',
    description:
      'A rugged dual-suspension kick scooter built to smooth out rough roads and handle longer, more adventurous rides.',
    priceCents: null,
    isFeatured: false,
    specs: { Range: 'Up to 60 km', 'Top speed': '32 km/h', Suspension: 'Front & rear', 'Tire size': '10.5"' },
    colors: [C.grey],
    source: { store: 'niu', handle: 'niu-kqi-300x-suspension-electric-scooter' },
  },
  {
    brandSlug: 'niu',
    categorySlug: 'e-bikes',
    slug: 'niu-bqi-c3-pro',
    name: 'BQi-C3 Pro',
    tagline: 'Smart electric bike.',
    description:
      'NIU’s connected electric bike — a comfortable, app-enabled ride with strong range for commuting and weekend exploring.',
    priceCents: null,
    isFeatured: false,
    specs: { Range: 'Up to 140 km', 'Top speed': '32 km/h', Motor: '750W', Battery: 'Dual battery capable' },
    colors: [C.black],
    source: { store: 'niu', handle: 'niu-bqi-electric-bike' },
  },

  // ── E-Ride Pro ──────────────────────────────────────────────
  {
    brandSlug: 'e-ride-pro',
    categorySlug: 'e-dirt-bikes',
    slug: 'e-ride-pro-mini-r',
    name: 'Mini R',
    tagline: 'Compact e-moto, full attitude.',
    description:
      'A smaller-framed electric dirt bike that keeps the E-Ride Pro punch in a more manageable package — great for tighter trails and newer riders.',
    priceCents: null,
    isFeatured: false,
    specs: { Battery: '72V 30Ah', Motor: '72V mid-drive', 'Wheel size': '14" / 12"', 'Brakes': 'Hydraulic disc' },
    colors: [C.black],
    source: { store: 'eridepro', handle: 'mini-r' },
  },
  {
    brandSlug: 'e-ride-pro',
    categorySlug: 'e-dirt-bikes',
    slug: 'e-ride-pro-pro-s',
    name: 'Pro-S',
    tagline: 'Street-legal trail ready.',
    description:
      'A versatile electric moto available in 16" and 17" configurations, balancing on-road manners with off-road capability.',
    priceCents: null,
    isFeatured: false,
    specs: { Motor: '5kW rated / 12kW peak', 'Wheel size': '16" or 17"', Brakes: 'Hydraulic disc', Suspension: 'FastAce' },
    colors: [C.black],
    source: { store: 'eridepro', handle: 'pro-s' },
  },
  {
    brandSlug: 'e-ride-pro',
    categorySlug: 'e-dirt-bikes',
    slug: 'e-ride-pro-ss-2',
    name: 'SS 2.0',
    tagline: 'Long-range electric dirt bike.',
    description:
      'A long-range 72V electric dirt bike with a swappable battery and serious acceleration — a favorite for adult off-road riders.',
    priceCents: null,
    isFeatured: true,
    specs: { Battery: '72V 40Ah (2880Wh)', Motor: '5kW rated / 12kW peak', 'Top speed': '~96 km/h', '0–48 km/h': '2.36 s' },
    colors: [C.black],
    source: { store: 'eridepro', handle: 'pro-ss-2-0' },
  },
  {
    brandSlug: 'e-ride-pro',
    categorySlug: 'e-dirt-bikes',
    slug: 'e-ride-pro-ss-3',
    name: 'SS 3.0',
    tagline: 'The next-gen SS.',
    description:
      'The evolution of the SS platform with upgraded components and seat options — more refinement for demanding trail days.',
    priceCents: null,
    isFeatured: false,
    specs: { Battery: '72V 50Ah', Motor: 'High-output mid-drive', Seat: 'Long / short options', Brakes: 'Racing hydraulic disc' },
    colors: [C.black],
    source: { store: 'eridepro', handle: 'pro-ss-3-0' },
  },
  {
    brandSlug: 'e-ride-pro',
    categorySlug: 'e-dirt-bikes',
    slug: 'e-ride-pro-sr',
    name: 'SR',
    tagline: 'Top of the range.',
    description:
      'E-Ride Pro’s flagship — the most powerful build in the lineup, with the biggest battery and highest top speed for experienced riders.',
    priceCents: null,
    isFeatured: true,
    specs: { Battery: '72V 50Ah', Motor: '10kW rated / 25kW peak', 'Top speed': '~112 km/h', '0–48 km/h': '1.8 s' },
    colors: [C.black],
    source: { store: 'eridepro', handle: 'pro-sr' },
  },

  // ── Yozma ───────────────────────────────────────────────────
  {
    brandSlug: 'yozma',
    categorySlug: 'e-dirt-bikes',
    slug: 'yozma-in-10',
    name: 'IN 10',
    tagline: 'Your entry into electric off-road.',
    description:
      'A compact, lightweight off-road electric dirt bike for teens and adults — an affordable, approachable way to get onto the trails.',
    priceCents: null,
    isFeatured: true,
    specs: { Battery: '48V 23Ah', Motor: '2600W mid-drive', 'Top speed': '~64 km/h', 'Wheel size': '14" / 12"' },
    colors: [C.red, C.black],
    source: { store: 'yozma', handle: 'in-10' },
  },
  {
    brandSlug: 'yozma',
    categorySlug: 'e-dirt-bikes',
    slug: 'yozma-in-10-pro',
    name: 'IN 10 Pro',
    tagline: 'More power, more range.',
    description:
      'The high-performance upgrade to the IN 10 — a bigger battery, stronger motor, and larger wheels for faster, longer rides.',
    priceCents: null,
    isFeatured: false,
    specs: { Battery: '60V 27Ah', Motor: '5500W peak mid-drive', 'Top speed': '~80 km/h', Range: 'Up to 96 km' },
    colors: [C.red, C.black],
    source: { store: 'yozma', handle: 'in-10-pro' },
  },

  // ── Univelo (AIMA) ──────────────────────────────────────────
  {
    brandSlug: 'univelo',
    categorySlug: 'e-bikes',
    slug: 'univelo-key-west',
    name: 'AIMA Key West',
    tagline: 'City commuter, step-through ease.',
    description:
      'A Bafang-powered urban e-bike with a comfortable step-through frame — smooth pedal assist for effortless city commuting.',
    priceCents: null,
    isFeatured: false,
    specs: { Motor: 'Bafang mid-drive', Battery: 'Bafang 12.8Ah', 'Tire size': '27.5" x 2.1"', Certification: 'UL-2849' },
    colors: [C.blue, C.pink],
    source: { store: 'univelo', handle: 'aima-key-west-e-bike' },
  },
  {
    brandSlug: 'univelo',
    categorySlug: 'e-bikes',
    slug: 'univelo-santa-monica',
    name: 'AIMA Santa Monica',
    tagline: 'Smooth-riding all-rounder.',
    description:
      'A versatile Bafang-powered e-bike with balanced geometry and torque-sensing assist, built for comfortable everyday riding.',
    priceCents: null,
    isFeatured: false,
    specs: { Motor: 'Bafang mid-drive', Battery: 'Bafang 15Ah', 'Tire size': '27.5" x 2.6"', Certification: 'UL-2849' },
    colors: [C.white, C.black, C.blue],
    source: { store: 'univelo', handle: 'aima-santa-monica-e-bike' },
  },
  {
    brandSlug: 'univelo',
    categorySlug: 'e-bikes',
    slug: 'univelo-big-sur-g2',
    name: 'AIMA Big Sur G2 26"',
    tagline: 'Fat-tire comfort cruiser.',
    description:
      'A 26" fat-tire e-bike with a Bafang motor and big battery — stable, planted, and ready for gravel, sand, or the daily commute.',
    priceCents: null,
    isFeatured: true,
    specs: { Motor: 'Bafang mid-drive', Battery: 'Bafang 15Ah', 'Tire size': '26" x 4.0"', Certification: 'UL-2849' },
    colors: [C.gray, C.black],
    source: { store: 'univelo', handle: 'aima-big-sur-g2-26-e-bike' },
  },
  {
    brandSlug: 'univelo',
    categorySlug: 'e-bikes',
    slug: 'univelo-big-sur-sport-g2',
    name: 'AIMA Big Sur Sport G2 20"',
    tagline: 'Compact fat-tire fun.',
    description:
      'A punchy 20" fat-tire e-bike — the compact, playful sibling of the Big Sur, easy to handle and full of character.',
    priceCents: null,
    isFeatured: false,
    specs: { Motor: 'Bafang mid-drive', Battery: 'Bafang 15Ah', 'Tire size': '20" x 4.0"', Certification: 'UL-2849' },
    colors: [C.sage, C.black, C.blue],
    source: { store: 'univelo', handle: 'aima-big-sur-sport-g2-20-e-bike' },
  },
  {
    brandSlug: 'univelo',
    categorySlug: 'e-bikes',
    slug: 'univelo-big-sur-cargo',
    name: 'AIMA Big Sur Cargo 20"',
    tagline: 'Haul more, ride electric.',
    description:
      'A cargo-ready fat-tire e-bike built to carry gear, groceries, or a passenger — a practical electric workhorse for family life.',
    priceCents: null,
    isFeatured: false,
    specs: { Motor: 'Bafang mid-drive', Battery: 'Bafang 15Ah', 'Tire size': '20" x 3.5"', 'Cargo ready': 'Yes' },
    colors: [C.chameleon],
    source: { store: 'univelo', handle: 'aima-big-sur-sport-20-e-bike-copy' },
  },
];
