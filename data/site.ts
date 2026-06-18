// Single source of truth for external URLs
const DONATE_URL = 'https://pay.zaprite.com/pl_TFoKMotEqk';
const FORUM_URL = 'https://forum.heatpunks.org';
const TELEGRAM_URL = 'https://t.me/heatpunks';

export const siteConfig = {
  name: 'Hashrate Heatpunks',
  tagline: 'A community working on the emerging hashrate heating industry - Marrying the bitcoin mining and heating sectors to bring hashrate back to homes and businesses',
  description: 'Join a community of builders turning Bitcoin mining heat into sustainable home heating solutions.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://heatpunks.org',

  links: {
    telegram: TELEGRAM_URL,
    twitter: 'https://x.com/HashHeatpunks',
    forum: FORUM_URL,
    nostr: 'https://primal.net/heatpunks',
    foundation: 'https://256foundation.org',
    foundationGithub: 'https://github.com/256foundation',
  },

  contact: {
    email: 'admin@heatpunks.org',
  },

  foundation: {
    name: '256 Foundation',
    mission: 'building the open-source Bitcoin mining ecosystem',
    url: 'https://256foundation.org',
    github: 'https://github.com/256foundation',
    donate: DONATE_URL,
  },

  // Grant program status. Flip `open` to true to reopen applications:
  // this re-enables the application form, the API endpoint, and the
  // "apply" CTAs across the site in one change.
  grants: {
    open: false,
  },
};

export interface NavItem {
  name: string;
  href: string;
  external?: boolean;
  variant?: 'default' | 'outline';
  children?: NavItem[];
}

export const navigation: NavItem[] = [
  { name: 'Home', href: '/' },
  { name: 'Mission', href: '/mission' },
  { name: 'Education', href: '/education' },
  { name: 'Grants', href: '/grants' },
  { name: 'Summit', href: '/summit' },
  { name: 'Forum', href: FORUM_URL, external: true },
  { name: 'Group Chat', href: TELEGRAM_URL, external: true },
  { name: 'Donate', href: DONATE_URL, external: true, variant: 'outline' },
];
