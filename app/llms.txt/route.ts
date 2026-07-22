import { siteConfig } from '@/data/site';
import { pageList } from '@/data/pages';

export const dynamic = 'force-static';

// llms.txt — a curated, machine-readable map of the site for AI agents and
// answer engines. Format follows https://llmstxt.org.
// Generated from data/pages.ts + data/site.ts so it never drifts from the site.
export function GET(): Response {
  const base = siteConfig.url;
  const abs = (route: string) => (route === '/' ? base : `${base}${route}`);

  const pageLines = pageList
    .map((p) => `- [${p.title}](${abs(p.route)}): ${p.llmsSummary}`)
    .join('\n');

  const body = `# ${siteConfig.name}

> A community turning Bitcoin mining heat into practical home and business heating. A project of the 256 Foundation.

${siteConfig.tagline}

## Pages
${pageLines}

## Community & external
- [Forum](${siteConfig.links.forum}): community discussion (Discourse)
- [Group chat / Telegram](${siteConfig.links.telegram})
- [X / Twitter](${siteConfig.links.twitter})
- [Nostr](${siteConfig.links.nostr})
- [256 Foundation](${siteConfig.foundation.url}): parent organization — ${siteConfig.foundation.mission}
- [256 Foundation Grants](${siteConfig.foundation.grants}): open-source Bitcoin mining grants program
- [256 Foundation Donate](${siteConfig.foundation.donate})

## Notes
- Hashrate Heatpunks does not run its own grant program; grants and donations are run by the 256 Foundation. The /grants path on this site redirects to ${siteConfig.foundation.grants}.
- Contact: ${siteConfig.contact.email}
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
    },
  });
}
