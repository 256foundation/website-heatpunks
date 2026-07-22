// Single source of truth for external URLs
const FORUM_URL = 'https://forum.heatpunks.org';
const TELEGRAM_URL = 'https://t.me/heatpunks';
const FOUNDATION_URL = 'https://256foundation.org';

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
    foundation: FOUNDATION_URL,
    foundationGithub: 'https://github.com/256foundation',
  },

  contact: {
    email: 'tyler@256foundation.org',
  },

  foundation: {
    name: '256 Foundation',
    mission: 'building the open-source Bitcoin mining ecosystem',
    url: FOUNDATION_URL,
    github: 'https://github.com/256foundation',
    donate: 'https://www.256foundation.org/donate',
    grants: 'https://www.256foundation.org/grants',
  },
};

export interface NavItem {
  name: string;
  href: string;
  external?: boolean;
  newTab?: boolean;
  variant?: 'default' | 'outline';
  children?: NavItem[];
}

export const navigation: NavItem[] = [
  { name: 'Home', href: '/' },
  { name: 'Mission', href: '/mission' },
  { name: 'Education', href: '/education' },
  { name: 'Summit', href: '/summit' },
  { name: 'Forum', href: FORUM_URL, external: true, newTab: false },
  { name: 'Group Chat', href: TELEGRAM_URL, external: true },
  { name: '256 Foundation', href: FOUNDATION_URL, external: true, variant: 'outline' },
];
