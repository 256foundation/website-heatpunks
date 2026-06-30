import type { Sponsor } from '@/types/schedule';

export const summit2025 = {
  year: 2025,
  name: 'Undermine: Heatpunk Summit 2025',
  shortName: 'HPS 2025',
  tagline: 'The first gathering. The spark that started it all.',
  dates: { day1: '2025-02-21', day2: '2025-02-22' },
  venue: {
    name: 'The Space',
    address: '3700 N Franklin St, Denver, CO 80205',
    city: 'Denver, CO',
  },
  stats: {
    attendees: '~150',
    days: 2,
    demos: '10+',
    sponsors: 4,
  },
  youtubePlaylistUrl:
    'https://www.youtube.com/watch?v=xarEPPMGdxU&list=PLgYVdSZznAdN3scDRRbUktk6quW3RtMgA',
  recapYoutubeId: 'c-NrYzmPRv8',
  takeaway:
    'First time ever bringing together mining developers, builders, pleb miners, tinkerers, and heating & building experts in the same room. The takeaway: we need to organize. Heatpunks.org and the community forum were born from these conversations.',
};

export const sponsors2025: Sponsor[] = [
  {
    name: 'Luxor',
    logo: '/images/summit/2025/sponsor-luxor.webp',
    url: 'https://luxor.tech',
  },
  {
    name: 'Braiins',
    logo: '/images/summit/2025/sponsor-braiins.webp',
    url: 'https://braiins.com',
  },
  {
    name: 'Compass Mining',
    logo: '/images/summit/2025/sponsor-compass.webp',
    url: 'https://compassmining.io',
  },
  {
    name: 'Build a Mine Podcast',
    logo: '/images/summit/2025/sponsor-bam.webp',
    url: 'https://bitcoinminingworld.com',
  },
];
