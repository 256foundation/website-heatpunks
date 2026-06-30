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
  tagline: 'The proof is in the pudding.',
  theme:
    'Year of documentation and results — FOSS firmware is live, case studies are written. Now we build on them.',
  ticket: {
    price: 350,
    currency: 'USD',
    paymentOptions: ['fiat', 'bitcoin'] as const,
    note: "Tickets are $350. You can pay in fiat or bitcoin when your spot is confirmed.",
  },
  sponsorEmail: 'admin@heatpunks.org',
};
