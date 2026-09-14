/**
 * Single source of truth for the shop's name / address / phone.
 *
 * These details used to be copy-pasted across nine components, which is how the
 * legacy vanilla/index.html ended up still claiming "170 Main St". Everything
 * that displays an address should read it from here.
 *
 * Note the legal pages (PrivacyPage, TermsPage) deliberately do NOT use this:
 * they name the registered business address as a legal statement, which is a
 * different thing from the storefronts we advertise.
 */

export interface Location {
  slug: 'fredericton' | 'ottawa';
  /** City and province, as displayed: 'Fredericton, NB'. */
  city: string;
  street: string;
  /** TODO: fill in once the Ottawa postal code is confirmed. */
  postal: string | null;
  /** Weekday line. Local time at each store. */
  hours: string;
  hoursSunday: string;
  phone: string;
  phoneHref: string;
  mapsUrl: string;
  status: 'flagship' | 'branch';
  /**
   * The badge on the Locations page. Change this if a shop isn't trading yet:
   * 'Opening Soon · Branch' is honest, 'Open Now' on a closed shop is not.
   */
  statusLabel: string;
}

export const LOCATIONS: Location[] = [
  {
    slug: 'fredericton',
    city: 'Fredericton, NB',
    street: '148 Main St',
    postal: 'E3A 2B5',
    hours: 'Mon–Sat: 10am – 6pm',
    hoursSunday: 'Sunday: Closed',
    phone: '+1 (506) 239-1855',
    phoneHref: 'tel:+15062391855',
    // The shop's own Google listing, so this lands on the business, not a pin.
    mapsUrl:
      'https://www.google.com/maps/place/East+Coast+EV/@45.9786595,-66.6542817,17z/data=!4m6!3m5!1s0x4ca41977adc4c7e7:0xc15110ae25b4c1af!8m2!3d45.9782928!4d-66.654598!16s%2Fg%2F11z68z8rqd',
    status: 'flagship',
    statusLabel: 'Open Now · Flagship',
  },
  {
    slug: 'ottawa',
    city: 'Ottawa, ON',
    street: '175 Carruthers Ave',
    postal: null,
    hours: 'Mon–Sat: 10am – 6pm',
    hoursSunday: 'Sunday: Closed',
    // TODO: a local 613 line would serve Ottawa customers better than the NB
    // number, both for trust and for local search. Shared for now.
    phone: '+1 (506) 239-1855',
    phoneHref: 'tel:+15062391855',
    // No Google listing for this branch yet, so search by address rather than
    // invent a place ID.
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=175+Carruthers+Ave%2C+Ottawa%2C+ON',
    status: 'branch',
    statusLabel: 'Open Now · Branch',
  },
];

/** The one customers should be pointed at by default. */
export const PRIMARY = LOCATIONS[0];

export const EMAIL = 'info@eastcoastev.ca';
export const EMAIL_HREF = `mailto:${EMAIL}`;

/** Just the city: 'Fredericton'. */
export function cityName(loc: Location): string {
  return loc.city.split(',')[0];
}

/** '148 Main St, Fredericton, NB' */
export function shortAddress(loc: Location): string {
  return `${loc.street}, ${loc.city}`;
}

/** '148 Main St, Fredericton, NB E3A 2B5', or the short form if no postal code. */
export function fullAddress(loc: Location): string {
  return loc.postal ? `${shortAddress(loc)} ${loc.postal}` : shortAddress(loc);
}

/** 'Fredericton, NB · Ottawa, ON' */
export function cityList(separator = ' · '): string {
  return LOCATIONS.map(l => l.city).join(separator);
}
