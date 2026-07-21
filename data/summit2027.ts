import type { Summit } from '@/types/schedule';

export const summit2027Venue: Summit['venue'] = {
  name: 'The Space',
  address: '3700 N Franklin St, Denver, CO 80205',
  timezone: 'America/Denver',
  coordinates: { lat: 39.7683395586488, lng: -104.96816299173025 },
};

export const summit2027: Summit = {
  year: 2027,
  dates: {
    pre_summit_day1: '2027-02-25',
    day1: '2027-02-26',
    day2: '2027-02-27',
  },
  venue: summit2027Venue,
};

export const summit2027Info = {
  theme: 'ACCELERATE',
  tagline: 'No more barriers. What will you build?',
  themeBlurb:
    'The open-source mining stack is here. Firmware, hashboard and control-board reference designs, and pool implementations are all open now — the historic barrier to building is gone. Year three is about acceleration: polish, possibility, and what comes next.',
  ticket: {
    price: 350,
    currency: 'USD',
    paymentOptions: ['fiat', 'bitcoin'] as const,
    includes: ['Meals during the summit', 'After-party', 'All talks, workshops & demos'],
    note: 'Tickets are $350. Pay in fiat or bitcoin when your spot is confirmed.',
  },
  // Prefer siteConfig.contact.email at call sites; this mirrors it for convenience.
  sponsorEmail: 'admin@heatpunks.org',
};
