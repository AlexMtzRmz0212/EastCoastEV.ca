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
//
// Not every manufacturer exposes a usable feed. Throne's store lists its e-motos
// without color options or per-variant photos, and Surron Canada's product feed
// is almost entirely spare parts (the complete bikes live on custom pages). Those
// products use `images` instead: drop files in scripts/product-images/ or give
// direct URLs. A product with neither seeds with no photos and logs a warning.

export interface SeedColor {
  name: string;
  hex: string;
}

// A manually supplied photo, for brands whose store has no usable Shopify feed.
// Exactly one of `file` or `url` must be set.
export interface SeedImage {
  /** Path under scripts/product-images/, e.g. 'throne/throne-strike/black-1.webp'. */
  file?: string;
  /** Or a direct image URL to download and re-host. */
  url?: string;
  /** Binds the photo to a swatch. Must match one of the product's SeedColor.name. */
  color?: string;
  alt?: string;
}

export interface SeedProduct {
  brandSlug: string;
  categorySlug: string;
  slug: string; // our URL slug, e.g. 'niu-kqi3-pro'
  name: string;
  tagline: string;
  description: string;
  priceCents: number | null;
  /**
   * Defaults to true. Set false to seed a product as a draft: the row exists
   * but RLS hides it from the site, so specs can be checked before it's live.
   */
  isPublished?: boolean;
  isFeatured: boolean;
  specs: Record<string, string>;
  colors: SeedColor[];
  /**
   * Where the photos come from. Pick one:
   *   `source` - scrape the manufacturer's Shopify product JSON (preferred).
   *   `images` - manual files/URLs, for stores with no usable product feed.
   * Omit both to seed the product row with no photos yet.
   */
  source?: { store: StoreKey; handle: string };
  images?: SeedImage[];
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
      'Exclusive Canadian distributor of AIMA e-bikes: Bafang-powered, UL-2849 certified commuter, cargo, and fat-tire rides.',
    website_url: 'https://www.univelo.ca',
    sort_order: 4,
  },
  {
    slug: 'throne',
    name: 'Throne',
    description:
      'Southern California builder of big-wheel e-bikes and e-motos, street-culture styling with serious power under it.',
    website_url: 'https://thronecycles.com',
    sort_order: 5,
  },
  {
    slug: 'sur-ron',
    name: 'Sur-Ron',
    description:
      'The benchmark in lightweight electric off-road. Light Bee, Ultra Bee, and Storm Bee built for trail, track, and everything between.',
    website_url: 'https://surron.ca',
    sort_order: 6,
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
  blackGold: { name: 'Black Gold', hex: '#1c1a17' },
  whiteGold: { name: 'White Gold', hex: '#ece2cf' },
  carbonBlack: { name: 'Carbon Black', hex: '#15171a' },
  desertBrown: { name: 'Desert Brown', hex: '#8a6f4e' },
  phantomPurple: { name: 'Phantom Purple', hex: '#4b3a63' },
  sageGreen: { name: 'Sage Green', hex: '#9caf88' },
  yellow: { name: 'Yellow', hex: '#e3b505' },
  green: { name: 'Green', hex: '#4a8a3c' },
  // Throne name their colourways; keep their names on the swatches.
  blackStrike: { name: 'Black Strike', hex: '#15151a' },
  cShadowBlack: { name: 'C Shadow Black', hex: '#26262b' },
  crimsonShadow: { name: 'Crimson Shadow', hex: '#8c1c24' },
  greyGold: { name: 'Grey Gold', hex: '#8a8377' },
  whiteSavage: { name: 'White Savage', hex: '#ededea' },
  concreteGrey: { name: 'Concrete Grey', hex: '#6f7276' },
  midnightBlue: { name: 'Midnight Blue', hex: '#1b2a4a' },
  diabloRed: { name: 'Diablo Red', hex: '#a51f27' },
  graphiteGrey: { name: 'Graphite Grey', hex: '#4a4d52' },
  blackOro: { name: 'Black Oro', hex: '#1a1814' },
  armyGreen: { name: 'Army Green', hex: '#4a5340' },
  whiteLux: { name: 'White Lux', hex: '#f0efeb' },
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
      'A dependable, no-fuss electric kick scooter with a comfortable ride and app connectivity, a great first e-scooter for getting around the city.',
    priceCents: 699.00 * 100,
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
      'The top of the KQi3 line, with extended range and a stronger motor for riders who want to go further and climb steeper hills.',
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
      'A carbon-fiber-framed kick scooter weighing just 11.9 kg, remarkably light and portable without giving up smart features.',
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
    priceCents: 1129.00 * 100,
    isFeatured: false,
    specs: { Range: 'Up to 60 km', 'Top speed': '32 km/h', Suspension: 'Front & rear', 'Tire size': '10.5"' },
    colors: [C.grey],
    source: { store: 'niu', handle: 'niu-kqi-300x-suspension-electric-scooter' },
  },
  {
    brandSlug: 'niu',
    categorySlug: 'e-scooters',
    slug: 'niu-kqi-300p',
    name: 'KQi 300P',
    tagline: 'Suspension comfort, daily range.',
    description:
      'A suspension-equipped kick scooter that soaks up rough pavement for a smooth, planted ride, a comfortable everyday commuter with full app connectivity.',
    priceCents: 969.00 * 100,
    isFeatured: false,
    specs: { Range: 'Up to 50 km', 'Top speed': '32 km/h', Suspension: 'Front & rear', 'Tire size': '10.5"' },
    colors: [C.black, C.white],
    source: { store: 'niu', handle: 'niu-kqi-300p-suspension-electric-kick-scooter' },
  },
  {
    brandSlug: 'niu',
    categorySlug: 'e-bikes',
    slug: 'niu-bqi-c3-pro',
    name: 'BQi-C3 Pro',
    tagline: 'Smart electric bike.',
    description:
      'NIU’s connected electric bike: a comfortable, app-enabled ride with strong range for commuting and weekend exploring.',
    priceCents: null,
    isFeatured: false,
    specs: { Range: 'Up to 140 km', 'Top speed': '32 km/h', Motor: '750W', Battery: 'Dual battery capable' },
    colors: [C.black],
    source: { store: 'niu', handle: 'niu-bqi-electric-bike' },
  },
  {
    brandSlug: 'niu',
    categorySlug: 'e-bikes',
    slug: 'niu-uqi-plus',
    name: 'UQi+ (eBike version)',
    tagline: 'Seated ride, e-bike freedom.',
    description:
      'The pedal-equipped, e-bike-classed version of NIU’s UQi+: a comfortable seated ride with removable batteries and up to 115 km of range, road-legal without a plate or licence.',
    priceCents: 995.00 * 100,
    isFeatured: true,
    specs: { Range: 'Up to 85–115 km', 'Top speed': '32 km/h', Motor: '1200W hub', Battery: 'Removable 31Ah / 42Ah' },
    colors: [C.blue, C.grey, C.red, C.white],
    source: { store: 'niu', handle: 'uqi-plus-electric-scooter' },
  },

  // ── E-Ride Pro ──────────────────────────────────────────────
  {
    brandSlug: 'e-ride-pro',
    categorySlug: 'e-dirt-bikes',
    slug: 'e-ride-pro-mini-r',
    name: 'Mini R',
    tagline: 'Compact e-moto, full attitude.',
    description:
      'A smaller-framed electric dirt bike that keeps the E-Ride Pro punch in a more manageable package, great for tighter trails and newer riders.',
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
      'A long-range 72V electric dirt bike with a swappable battery and serious acceleration, a favorite for adult off-road riders.',
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
      'The evolution of the SS platform with upgraded components and seat options, with more refinement for demanding trail days.',
    priceCents: 6800.00 * 100,
    isFeatured: false,
    specs: { Battery: '72V 50Ah', Motor: 'High-output mid-drive', Seat: 'Long / short options', Brakes: 'Racing hydraulic disc' },
    colors: [C.black],
    // E Ride Pro pulled the complete bikes from their public product feed, so
    // this handle now 404s. Photos recovered from our own storage and committed
    // under scripts/product-images/ instead.
    images: [
      { file: 'e-ride-pro/e-ride-pro-ss-3/gallery-1.png' },
      { file: 'e-ride-pro/e-ride-pro-ss-3/gallery-2.jpg' },
    ],
  },
  {
    brandSlug: 'e-ride-pro',
    categorySlug: 'e-dirt-bikes',
    slug: 'e-ride-pro-sr',
    name: 'SR',
    tagline: 'Top of the range.',
    description:
      'E-Ride Pro’s flagship: the most powerful build in the lineup, with the biggest battery and highest top speed for experienced riders.',
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
      'A compact, lightweight off-road electric dirt bike for teens and adults, an affordable and approachable way to get onto the trails.',
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
      'The high-performance upgrade to the IN 10: a bigger battery, stronger motor, and larger wheels for faster, longer rides.',
    priceCents: 3099.00 * 100,
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
      'A Bafang-powered urban e-bike with a comfortable step-through frame and smooth pedal assist for effortless city commuting.',
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
      'A 26" fat-tire e-bike with a Bafang motor and big battery: stable, planted, and ready for gravel, sand, or the daily commute.',
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
      'A punchy 20" fat-tire e-bike: the compact, playful sibling of the Big Sur, easy to handle and full of character.',
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
      'A cargo-ready fat-tire e-bike built to carry gear, groceries, or a passenger, a practical electric workhorse for family life.',
    priceCents: null,
    isFeatured: false,
    specs: { Motor: 'Bafang mid-drive', Battery: 'Bafang 15Ah', 'Tire size': '20" x 3.5"', 'Cargo ready': 'Yes' },
    colors: [C.chameleon],
    source: { store: 'univelo', handle: 'aima-big-sur-sport-20-e-bike-copy' },
  },

  // ── Throne ──────────────────────────────────────────────────
  //
  // Model names come from Throne's own product feed. Note "Strike" is one of
  // their colourway names (Black Strike), not a model: the bikes are the Goon,
  // the Rhino, the Shadow and the SRPNT.
  //
  // Their feed lists each colour as its own product rather than as variants of
  // one, so the usual `source` scrape can't group them. The per-colour photos
  // are pulled by URL instead and re-hosted in Supabase Storage on seed.
  //
  // OWNER: this is Throne's full line-up. Delete the ones the shop doesn't
  // carry, and check the specs, which are a researched starting point only.
  {
    brandSlug: 'throne',
    categorySlug: 'e-bikes',
    slug: 'throne-goon',
    name: 'The Goon',
    tagline: 'Big wheels, bigger presence.',
    description:
      'Throne’s signature big-wheel e-bike. A moto stance on 26" wheels, upright and unmistakable, built for looking good at low speed around town.',
    priceCents: null,
    isFeatured: true,
    specs: { Style: 'Big-wheel e-bike', Wheels: '26"', Use: 'Street & commuter' },
    colors: [C.blackStrike, C.cShadowBlack],
    images: [
      { url: 'https://cdn.shopify.com/s/files/1/0708/7999/files/BlackStrike-26x2.jpg?v=1774548617&width=1400', color: 'Black Strike' },
      { url: 'https://cdn.shopify.com/s/files/1/0708/7999/files/Shadow1_3696dc08-f782-40e2-a0f3-a9d642992e03.jpg?v=1715621758&width=1400', color: 'C Shadow Black' },
    ],
  },
  {
    brandSlug: 'throne',
    categorySlug: 'e-bikes',
    slug: 'throne-goon-runner',
    name: 'The Goon Runner',
    tagline: 'The Goon, quicker.',
    description:
      'A faster, sharper take on the Goon platform for riders who want the same silhouette with more urgency behind it.',
    priceCents: null,
    isFeatured: false,
    specs: { Style: 'Big-wheel e-bike', Use: 'Street & commuter' },
    colors: [C.crimsonShadow],
    images: [
      { url: 'https://cdn.shopify.com/s/files/1/0708/7999/files/TGR-DiabloRed1.jpg?v=1768934329&width=1400', color: 'Crimson Shadow' },
    ],
  },
  {
    brandSlug: 'throne',
    categorySlug: 'e-bikes',
    slug: 'throne-rhino',
    name: 'Rhino',
    tagline: 'Fat tyres, flat out.',
    description:
      'The wide-tyre one. Planted, heavy-set and happy on loose ground as well as pavement.',
    priceCents: null,
    isFeatured: false,
    specs: { Style: 'Fat-tyre e-bike', Use: 'Street & light off-road' },
    colors: [C.blackStrike],
    images: [
      { url: 'https://cdn.shopify.com/s/files/1/0708/7999/files/BlackRhix2_1.jpg?v=1766789973&width=1400', color: 'Black Strike' },
    ],
  },
  {
    brandSlug: 'throne',
    categorySlug: 'e-dirt-bikes',
    slug: 'throne-shadow-48v',
    name: 'Shadow 48V',
    tagline: 'The way into e-motos.',
    description:
      'A compact electric moto that shrugs off curbs and trails alike. Light enough to flick through traffic, punchy enough to keep up with anything.',
    priceCents: null,
    isFeatured: false,
    specs: { Motor: '3,000W peak', Battery: '48V 23.4Ah', 'Top speed': 'Up to 60 km/h' },
    colors: [C.black, C.white, C.red],
    images: [
      { url: 'https://cdn.shopify.com/s/files/1/0708/7999/files/S48-Black2.jpg?v=1785261294&width=1400', color: 'Black' },
      { url: 'https://cdn.shopify.com/s/files/1/0708/7999/files/S48-White2.jpg?v=1779733408&width=1400', color: 'White' },
      { url: 'https://cdn.shopify.com/s/files/1/0708/7999/files/S48-Red2.jpg?v=1779732892&width=1400', color: 'Red' },
    ],
  },
  {
    brandSlug: 'throne',
    categorySlug: 'e-dirt-bikes',
    slug: 'throne-shadow-60v',
    name: 'Shadow 60V',
    tagline: 'More volts, more shove.',
    description:
      'The same compact Shadow chassis on a 60V pack, for riders who found the 48V a little polite.',
    priceCents: null,
    isFeatured: false,
    specs: { Battery: '60V', Style: 'Electric moto', Use: 'Street & off-road' },
    colors: [C.black, C.white, C.blue],
    images: [
      { url: 'https://cdn.shopify.com/s/files/1/0708/7999/files/S60-BLack2.jpg?v=1780507218&width=1400', color: 'Black' },
      { url: 'https://cdn.shopify.com/s/files/1/0708/7999/files/S60-White2.jpg?v=1779733063&width=1400', color: 'White' },
      { url: 'https://cdn.shopify.com/s/files/1/0708/7999/files/S60-Blue2.jpg?v=1780506755&width=1400', color: 'Blue' },
    ],
  },
  {
    brandSlug: 'throne',
    categorySlug: 'e-dirt-bikes',
    slug: 'throne-shadow-72v',
    name: 'Shadow 72V',
    tagline: 'The quick one.',
    description:
      'Top of the Shadow range. A 72V pack in the same compact frame, which is as fast as this platform gets.',
    priceCents: null,
    isFeatured: true,
    specs: { Battery: '72V', Style: 'Electric moto', Use: 'Street & off-road' },
    colors: [C.black, C.white, C.greyGold],
    images: [
      { url: 'https://cdn.shopify.com/s/files/1/0708/7999/files/S72-Black2.jpg?v=1779733258&width=1400', color: 'Black' },
      { url: 'https://cdn.shopify.com/s/files/1/0708/7999/files/S72-White2.jpg?v=1779733192&width=1400', color: 'White' },
      { url: 'https://cdn.shopify.com/s/files/1/0708/7999/files/S72-Grey2.jpg?v=1780506875&width=1400', color: 'Grey Gold' },
    ],
  },
  {
    brandSlug: 'throne',
    categorySlug: 'e-dirt-bikes',
    slug: 'throne-shadow-lx4',
    name: 'Shadow LX4',
    tagline: 'Shadow, dressed up.',
    description:
      'The LX trim of the Shadow, finished in gold against black or white. Same compact e-moto underneath, more of an occasion to look at.',
    priceCents: null,
    isFeatured: false,
    specs: { Style: 'Electric moto', Trim: 'LX4', Use: 'Street & off-road' },
    colors: [C.blackGold, C.whiteGold],
    images: [
      { url: 'https://cdn.shopify.com/s/files/1/0708/7999/files/V2-B2.jpg?v=1783534844&width=1400', color: 'Black Gold' },
      { url: 'https://cdn.shopify.com/s/files/1/0708/7999/files/V1-W2.jpg?v=1783529157&width=1400', color: 'White Gold' },
    ],
  },
  {
    brandSlug: 'throne',
    categorySlug: 'e-dirt-bikes',
    slug: 'throne-shadow-lx6',
    name: 'Shadow LX6',
    tagline: 'The top Shadow trim.',
    description:
      'The furthest Throne take the Shadow: the LX finish with the strongest drivetrain in the range behind it.',
    priceCents: null,
    isFeatured: false,
    specs: { Style: 'Electric moto', Trim: 'LX6', Use: 'Street & off-road' },
    colors: [C.blackGold, C.whiteGold],
    images: [
      { url: 'https://cdn.shopify.com/s/files/1/0708/7999/files/V1-B2.jpg?v=1785353514&width=1400', color: 'Black Gold' },
      { url: 'https://cdn.shopify.com/s/files/1/0708/7999/files/V1-W22.jpg?v=1785354346&width=1400', color: 'White Gold' },
    ],
  },
  {
    brandSlug: 'throne',
    categorySlug: 'e-dirt-bikes',
    slug: 'throne-srpnt-x3',
    name: 'SRPNT X3',
    tagline: 'Full-size, full send.',
    description:
      'Throne’s full-size electric dirt bike. Long-travel suspension, real power, and five colourways to pick a fight in.',
    priceCents: null,
    isFeatured: true,
    specs: { Style: 'Electric dirt bike', Use: 'Track & trail', Suspension: 'Long travel' },
    colors: [C.whiteSavage, C.concreteGrey, C.blackStrike, C.midnightBlue, C.diabloRed],
    images: [
      { url: 'https://cdn.shopify.com/s/files/1/0708/7999/files/WhiteSavagex2_02eaac2f-8172-4ce8-b852-80c299413ce5.jpg?v=1730497544&width=1400', color: 'White Savage' },
      { url: 'https://cdn.shopify.com/s/files/1/0708/7999/files/GreyConcretex2_6e3f98ff-58a8-4680-88e1-6ff32cefd493.jpg?v=1753924993&width=1400', color: 'Concrete Grey' },
      { url: 'https://cdn.shopify.com/s/files/1/0708/7999/files/Screenshot_2025-06-20_at_6.34.32_PM_1.png?v=1753924981&width=1400', color: 'Black Strike' },
      { url: 'https://cdn.shopify.com/s/files/1/0708/7999/files/Screenshot_2025-06-19_at_2.02.04_PM.png?v=1753924998&width=1400', color: 'Midnight Blue' },
      { url: 'https://cdn.shopify.com/s/files/1/0708/7999/files/SRPNT-DiabloRed1_1_fa079214-17b1-4985-9d40-489a5e38481a.jpg?v=1753925002&width=1400', color: 'Diablo Red' },
    ],
  },
  {
    brandSlug: 'throne',
    categorySlug: 'e-dirt-bikes',
    slug: 'throne-srpnt-x8',
    name: 'SRPNT X8',
    tagline: 'The bigger SRPNT.',
    description:
      'A step up from the X3 in both size and output, for riders who have outgrown their first e-moto.',
    priceCents: null,
    isFeatured: false,
    specs: { Style: 'Electric dirt bike', Use: 'Track & trail' },
    colors: [C.blackStrike, C.midnightBlue, C.graphiteGrey],
    images: [
      { url: 'https://cdn.shopify.com/s/files/1/0708/7999/files/X8Black-2.jpg?v=1778033049&width=1400', color: 'Black Strike' },
      { url: 'https://cdn.shopify.com/s/files/1/0708/7999/files/X8MidnightBlue-1_94da9b5b-4fdb-4bb7-ad00-d860c5e9cb1d.jpg?v=1780336970&width=1400', color: 'Midnight Blue' },
      { url: 'https://cdn.shopify.com/s/files/1/0708/7999/files/X8GraphiteGrey-2_4f098fde-0587-4045-9f87-1960c3202ddf.jpg?v=1780337108&width=1400', color: 'Graphite Grey' },
    ],
  },
  {
    brandSlug: 'throne',
    categorySlug: 'e-dirt-bikes',
    slug: 'throne-srpnt-z27',
    name: 'SRPNT Z27',
    tagline: 'The flagship SRPNT.',
    description:
      'The top of the SRPNT line, in Black Oro, Army Green or White Lux. The most bike Throne currently make.',
    priceCents: null,
    isFeatured: false,
    specs: { Style: 'Electric dirt bike', Use: 'Track & trail' },
    colors: [C.blackOro, C.armyGreen, C.whiteLux],
    images: [
      { url: 'https://cdn.shopify.com/s/files/1/0708/7999/files/Z27Black-2_1f5dc724-efbc-459c-910a-4a5a7bd0e82c.jpg?v=1778034241&width=1400', color: 'Black Oro' },
      { url: 'https://cdn.shopify.com/s/files/1/0708/7999/files/Z27ForestGreen-1_078b9910-b42b-4cc0-a70c-e657262e0765.jpg?v=1780336885&width=1400', color: 'Army Green' },
      { url: 'https://cdn.shopify.com/s/files/1/0708/7999/files/Z27White-2.jpg?v=1777682621&width=1400', color: 'White Lux' },
    ],
  },

  // ── Sur-Ron ─────────────────────────────────────────────────
  //
  // Surron Canada's product feed carries spare parts only; the complete bikes
  // live on custom /pages/* routes. The per-colour shots below come from the
  // cut-out studio images their colour picker uses. Those ship with an alpha
  // channel, which left the card tile's grey showing where every other product
  // has a white box, so they were flattened onto white, trimmed and committed
  // under scripts/product-images/. The action photography follows as generic
  // gallery shots.
  //
  // OWNER: specs here are deliberately thin. Please fill them in from the
  // dealer sheets before quoting anything off this page.
  {
    brandSlug: 'sur-ron',
    categorySlug: 'e-dirt-bikes',
    slug: 'sur-ron-light-bee-x',
    name: 'Light Bee X',
    tagline: 'The one that started it all.',
    description:
      'The bike that defined lightweight electric off-road. Genuine trail performance in a frame light enough to pick up and point wherever you want it.',
    priceCents: null,
    isFeatured: true,
    specs: { Style: 'Lightweight electric off-road', Battery: '60V lithium', Use: 'Trail & off-road' },
    colors: [C.carbonBlack, C.white, C.phantomPurple, C.sageGreen],
    images: [
      { file: 'sur-ron/sur-ron-light-bee-x/carbon-black.jpg', color: 'Carbon Black' },
      { file: 'sur-ron/sur-ron-light-bee-x/white.jpg', color: 'White' },
      { file: 'sur-ron/sur-ron-light-bee-x/phantom-purple.jpg', color: 'Phantom Purple' },
      { file: 'sur-ron/sur-ron-light-bee-x/sage-green.jpg', color: 'Sage Green' },
      { url: 'https://cdn.shopify.com/s/files/1/0540/6644/6508/files/26LB1.webp?v=1779721410&width=1400' },
      { url: 'https://cdn.shopify.com/s/files/1/0540/6644/6508/files/26LB7.webp?v=1779723697&width=1400' },
      { url: 'https://cdn.shopify.com/s/files/1/0540/6644/6508/files/26LB9.webp?v=1779723745&width=1400' },
    ],
  },
  {
    brandSlug: 'sur-ron',
    categorySlug: 'e-dirt-bikes',
    slug: 'sur-ron-ultra-bee',
    name: 'Ultra Bee',
    tagline: 'Full-size performance, electric.',
    description:
      'Sur-Ron’s midweight electric motorcycle: a real full-size chassis with the power and suspension travel to match, and no engine noise to announce it.',
    priceCents: null,
    isFeatured: true,
    specs: { Style: 'Midweight electric motorcycle', Wheels: '19" / 18"', Use: 'Trail & dual-sport' },
    colors: [C.carbonBlack, C.desertBrown],
    images: [
      { file: 'sur-ron/sur-ron-ultra-bee/carbon-black.jpg', color: 'Carbon Black' },
      { file: 'sur-ron/sur-ron-ultra-bee/desert-brown.jpg', color: 'Desert Brown' },
      { url: 'https://cdn.shopify.com/s/files/1/0540/6644/6508/files/26UB3.jpg?v=1779473348&width=1400' },
      { url: 'https://cdn.shopify.com/s/files/1/0540/6644/6508/files/26UB5.jpg?v=1779473411&width=1400' },
      { url: 'https://cdn.shopify.com/s/files/1/0540/6644/6508/files/26UB6.jpg?v=1779473547&width=1400' },
    ],
  },
  {
    brandSlug: 'sur-ron',
    categorySlug: 'e-dirt-bikes',
    slug: 'sur-ron-storm-bee',
    name: 'Storm Bee',
    tagline: 'The heavy hitter.',
    description:
      'The biggest bike in the range: full-size motocross proportions, serious torque, and the chassis to put it down. Built for riders who want no compromise.',
    priceCents: null,
    isFeatured: false,
    specs: { Style: 'Full-size electric motocross', Drive: '520 chain', Use: 'Motocross & trail' },
    colors: [C.white],
    // Surron Canada's Storm Bee page predates their cut-out studio shots, so
    // this is the side-on view cropped out of their three-angle studio photo
    // and committed here, to keep the card consistent with the rest.
    images: [
      { file: 'sur-ron/sur-ron-storm-bee/profile.jpg', color: 'White' },
      { url: 'https://cdn.shopify.com/s/files/1/0604/9356/2061/files/20220425-0V8A4181-Edit_600x600.jpg?v=1667577845' },
      { url: 'https://cdn.shopify.com/s/files/1/0604/9356/2061/files/20220425-0V8A4129-Edit_600x600.jpg?v=1667578231' },
    ],
  },
  {
    brandSlug: 'sur-ron',
    categorySlug: 'e-dirt-bikes',
    slug: 'sur-ron-hyper-bee',
    name: 'Hyper Bee',
    tagline: 'Small frame, real bite.',
    description:
      'The compact one in the family, sized for younger and smaller riders but built with the same engineering, not a toy version of it.',
    priceCents: null,
    isFeatured: false,
    specs: { Style: 'Compact electric off-road', Battery: '50.4V lithium', Wheels: '12"' },
    colors: [C.blue, C.yellow, C.green],
    images: [
      { file: 'sur-ron/sur-ron-hyper-bee/blue.jpg', color: 'Blue' },
      { file: 'sur-ron/sur-ron-hyper-bee/yellow.jpg', color: 'Yellow' },
      { file: 'sur-ron/sur-ron-hyper-bee/green.jpg', color: 'Green' },
      { url: 'https://cdn.shopify.com/s/files/1/0540/6644/6508/files/2026HyperBee_1.jpg?v=1773933804&width=1400' },
      { url: 'https://cdn.shopify.com/s/files/1/0540/6644/6508/files/2026HyperBee_3.jpg?v=1773933832&width=1400' },
      { url: 'https://cdn.shopify.com/s/files/1/0540/6644/6508/files/2026HyperBee_5.jpg?v=1773933855&width=1400' },
    ],
  },
];
