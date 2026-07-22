// Page inventory — single source of truth for per-page metadata, OpenGraph
// terminal-image content, the sitemap, and llms.txt.
//
// Add a new page here and it automatically flows into:
//   - lib/metadata.ts    (pageMetadata) -> <title>, description, canonical, OG + Twitter cards
//   - app/api/og/route.tsx (?card=<key>) -> the terminal social image
//   - app/sitemap.ts       -> sitemap.xml
//   - app/llms.txt/route.ts -> llms.txt

// The terminal content rendered into a page's OG image (see app/api/og/route.tsx).
export interface PageOg {
  /** Title-bar path, e.g. '~/summit' (shown after 'heatpunks.org — '). */
  path: string;
  /** Command typed at the prompt, e.g. './register --summit 2027'. */
  command: string;
  /** Large flame-gradient wordmark, e.g. 'HEATPUNK SUMMIT'. */
  wordmark: string;
  /** Optional white sub-line under the wordmark, e.g. event dates. */
  meta?: string;
  /** The green '// ...' comment line. */
  comment: string;
  /** Alt text for the generated image. */
  alt: string;
}

export interface PageEntry {
  /** Inventory + OG card key, e.g. 'summit'. */
  key: string;
  /** Route path, e.g. '/summit'. */
  route: string;
  /** <title> segment. For the home page this is the full descriptive default. */
  title: string;
  /** Home uses `title` as an absolute default (no '| Hashrate Heatpunks' template). */
  isHome?: boolean;
  /** Meta + OpenGraph description. */
  description: string;
  /** Sitemap priority (0–1). */
  priority: number;
  /** Sitemap change frequency. */
  changeFrequency: 'weekly' | 'monthly' | 'yearly';
  /** One-line summary for llms.txt (defaults to description if identical). */
  llmsSummary: string;
  /** Terminal content for the OG image. */
  og: PageOg;
}

export const pages: Record<string, PageEntry> = {
  home: {
    key: 'home',
    route: '/',
    title: 'Hashrate Heatpunks — Bitcoin Mining Heat for Homes & Businesses',
    isHome: true,
    description:
      'Hashrate Heatpunks is a community turning Bitcoin mining heat into practical home and business heating. Explore guides, the forum, and the Heatpunk Summit.',
    priority: 1,
    changeFrequency: 'weekly',
    llmsSummary:
      'Community hub for the emerging hashrate heating industry — landing page, live forum feed, and links.',
    og: {
      path: '~',
      command: 'whoami',
      wordmark: 'HASHRATE HEATPUNKS',
      comment: '// a community building the hashrate heating industry',
      alt: 'Terminal window: whoami → HASHRATE HEATPUNKS',
    },
  },

  mission: {
    key: 'mission',
    route: '/mission',
    title: 'Mission',
    description:
      'Our mission: make hashrate heating accessible to everyone — building the standards, safety certifications, and tools for a new decentralized mining-heat industry.',
    priority: 0.9,
    changeFrequency: 'monthly',
    llmsSummary:
      'Why hashrate heating matters and what the community is building — the mission and guiding beliefs.',
    og: {
      path: '~/mission',
      command: 'cat mission.txt',
      wordmark: 'OUR MISSION',
      comment: '// make hashrate heating accessible to everyone',
      alt: 'Terminal window: cat mission.txt → OUR MISSION',
    },
  },

  education: {
    key: 'education',
    route: '/education',
    title: 'Resources',
    description:
      'DIY guides, books, and Heatpunk Summit talks on turning Bitcoin mining into home heat. Learn hashrate heating from first principles.',
    priority: 0.8,
    changeFrequency: 'monthly',
    llmsSummary:
      'Educational resources: books, DIY guides, and recorded Heatpunk Summit talks and videos.',
    og: {
      path: '~/resources',
      command: 'ls ./resources',
      wordmark: 'RESOURCES',
      meta: 'books/  guides/  summit-talks/',
      comment: '// diy hashrate heating, from first principles',
      alt: 'Terminal window: ls ./resources → RESOURCES (books, guides, summit-talks)',
    },
  },

  summit: {
    key: 'summit',
    route: '/summit',
    title: 'Heatpunk Summit 2027',
    description:
      'Heatpunk Summit 2027 — Feb 26–27 in Denver, CO. The third annual gathering of Bitcoin mining and heating builders. $350, fiat or bitcoin. Join the waitlist.',
    priority: 0.9,
    changeFrequency: 'weekly',
    llmsSummary:
      'Heatpunk Summit 2027 — the upcoming third annual gathering (Feb 26–27, Denver). Details and waitlist.',
    og: {
      path: '~/summit',
      command: './register --summit 2027',
      wordmark: 'HEATPUNK SUMMIT',
      meta: 'FEB 26–27, 2027 · DENVER, CO',
      comment: '// the open-source stack is here. accelerate.',
      alt: 'Terminal window: ./register --summit 2027 → HEATPUNK SUMMIT · FEB 26–27 2027 · DENVER, CO',
    },
  },

  schedule: {
    key: 'schedule',
    route: '/summit/schedule',
    title: 'Summit 2026 Schedule',
    description:
      'Full schedule for Heatpunk Summit 2026 — workshops, demos, panels, and networking, Feb 27–28 in Denver, CO.',
    priority: 0.8,
    changeFrequency: 'weekly',
    llmsSummary: 'Full session schedule archive for Heatpunk Summit 2026.',
    og: {
      path: '~/summit/schedule',
      command: 'cat schedule.txt',
      wordmark: 'SUMMIT SCHEDULE',
      meta: 'HPS 2026 · FEB 27–28 · DENVER',
      comment: '// workshops · demos · panels',
      alt: 'Terminal window: cat schedule.txt → SUMMIT SCHEDULE · HPS 2026 · FEB 27–28 · DENVER',
    },
  },

  'summit-2025': {
    key: 'summit-2025',
    route: '/summit/2025',
    title: 'Undermine: Summit 2025 Archive',
    description:
      'Undermine — Heatpunk Summit 2025 archive. The first gathering that brought ~150 mining developers and heating experts together, Feb 21–22 in Denver, CO.',
    priority: 0.5,
    changeFrequency: 'yearly',
    llmsSummary:
      'Archive of Heatpunk Summit 2025 ("Undermine") — the first gathering, ~150 builders, Denver.',
    og: {
      path: '~/summit/2025',
      command: 'cat archive/2025.txt',
      wordmark: 'UNDERMINE',
      meta: 'HPS 2025 · ~150 BUILDERS · DENVER',
      comment: '// the first gathering. where it started.',
      alt: 'Terminal window: cat archive/2025.txt → UNDERMINE · HPS 2025 · ~150 builders · Denver',
    },
  },

  'summit-2026': {
    key: 'summit-2026',
    route: '/summit/2026',
    title: 'Summit 2026 Archive',
    description:
      'Heatpunk Summit 2026 archive — the second gathering, Feb 27–28 in Denver. Full schedule, recordings, sponsors, and the first Heatpunk Innovation Award.',
    priority: 0.5,
    changeFrequency: 'yearly',
    llmsSummary:
      'Archive of Heatpunk Summit 2026 — the second gathering. Schedule, recordings, sponsors.',
    og: {
      path: '~/summit/2026',
      command: 'cat archive/2026.txt',
      wordmark: 'HEATPUNK SUMMIT 2026',
      meta: 'THE SECOND GATHERING · DENVER',
      comment: '// became a 256 foundation project',
      alt: 'Terminal window: cat archive/2026.txt → HEATPUNK SUMMIT 2026 · the second gathering · Denver',
    },
  },
};

/** Ordered list of pages for iteration (sitemap, llms.txt). */
export const pageList: PageEntry[] = Object.values(pages);

/**
 * Synthesize an OG card for the generic /summit/[year] archive fallback.
 * Used by the OG route when `?card=archive&year=<year>` is requested.
 */
export function archiveOg(year: string): PageOg {
  return {
    path: `~/summit/${year}`,
    command: `cat archive/${year}.txt`,
    wordmark: `SUMMIT ${year}`,
    comment: '// archived event',
    alt: `Terminal window: cat archive/${year}.txt → SUMMIT ${year}`,
  };
}
