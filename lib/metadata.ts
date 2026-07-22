import type { Metadata } from 'next';
import { siteConfig } from '@/data/site';
import { pages, type PageEntry } from '@/data/pages';

const SITE_NAME = siteConfig.name;
const TWITTER_HANDLE = '@HashHeatpunks';

/** Absolute-ish OG title: home is the descriptive default; subpages append the brand. */
function ogTitleFor(entry: PageEntry): string {
  return entry.isHome ? entry.title : `${entry.title} | ${SITE_NAME}`;
}

/** Path to the terminal OG image for a given card key. */
export function ogImagePath(cardKey: string): string {
  return `/api/og?card=${encodeURIComponent(cardKey)}`;
}

interface BuildMetadataInput {
  title: string;
  description: string;
  canonicalPath: string;
  cardKey: string;
  cardQuery?: string; // optional extra query, e.g. 'year=2024'
  ogTitle: string;
  alt: string;
  isHome?: boolean;
}

/** Low-level builder shared by pageMetadata() and the [year] fallback. */
export function buildMetadata({
  title,
  description,
  canonicalPath,
  cardKey,
  cardQuery,
  ogTitle,
  alt,
  isHome,
}: BuildMetadataInput): Metadata {
  const imageUrl = cardQuery
    ? `${ogImagePath(cardKey)}&${cardQuery}`
    : ogImagePath(cardKey);

  return {
    // Home sets its own absolute default in the root layout; subpages flow
    // through the '%s | Hashrate Heatpunks' template.
    title: isHome ? undefined : title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: ogTitle,
      description,
      url: canonicalPath,
      siteName: SITE_NAME,
      locale: 'en_US',
      type: 'website',
      images: [{ url: imageUrl, width: 1200, height: 630, alt }],
    },
    twitter: {
      card: 'summary_large_image',
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
      title: ogTitle,
      description,
      images: [imageUrl],
    },
  };
}

/**
 * Build a Next.js Metadata object for a page in the inventory (data/pages.ts).
 * Guarantees the tab title, description, canonical URL, OG card, and Twitter
 * card all stay in sync.
 */
export function pageMetadata(key: string): Metadata {
  const entry = pages[key];
  if (!entry) {
    throw new Error(`pageMetadata: unknown page key "${key}"`);
  }

  return buildMetadata({
    title: entry.title,
    description: entry.description,
    canonicalPath: entry.route,
    cardKey: entry.key,
    ogTitle: ogTitleFor(entry),
    alt: entry.og.alt,
    isHome: entry.isHome,
  });
}
