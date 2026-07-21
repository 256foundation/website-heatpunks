import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import Link from 'next/link';
import { VideoEmbed } from '@/components/shared/VideoEmbed';
import { Summit2025Hero } from '@/components/summit/Summit2025Hero';
import { TalkGrid } from '@/components/summit/TalkGrid';
import { SponsorRow2025 } from '@/components/summit/SponsorRow2025';
import { SummitCommunitySection } from '@/components/summit/SummitCommunitySection';
import { summit2025, sponsors2025 } from '@/data/summit2025';
import { summit2025Videos } from '@/data/videos';

export const metadata: Metadata = {
  title: 'Undermine: Summit 2025 Archive',
  description:
    'Undermine — Heatpunk Summit 2025 archive. February 21–22 in Denver, CO. The first gathering that brought mining developers and heating experts together for the very first time.',
  openGraph: {
    title: 'Undermine: HPS 2025 Archive | Hashrate Heatpunks',
    description:
      'The first gathering. ~150 builders. The spark that started the hashrate heating movement.',
    images: [
      '/api/og?title=UNDERMINE&subtitle=Heatpunk%20Summit%202025%20Archive%20%C2%B7%20Denver&page=summit',
    ],
  },
};

export default function Summit2025Page() {
  const recapVideo = summit2025Videos[0];
  const talkVideos = summit2025Videos.slice(1);

  return (
    <div className="bg-[var(--background)]">
      {/* Archive banner — cross-year CTA stays orange */}
      <div className="border-b border-[var(--card-border)] bg-[var(--card-background)] px-4 py-2 text-center">
        <p className="font-mono text-[10px] tracking-widest text-[var(--muted)]">
          <span className="text-[var(--terminal-color)]">ARCHIVE</span> · HPS 2025 ·{' '}
          <Link href="/summit" className="text-[var(--accent)] hover:underline">
            VIEW HPS 2027 →
          </Link>
        </p>
      </div>

      {/* Hero (includes integrated stats) */}
      <Summit2025Hero />

      {/* Origin story + event details */}
      <section className="border-t border-[var(--card-border)] bg-[var(--background)] py-16 md:py-24">
        <div className="section-container">
          <div className="grid max-w-5xl gap-12 md:grid-cols-2">
            <div>
              <span className="section-tag">[001]</span>
              <h2 className="mt-2 mb-6 font-mono text-2xl md:text-3xl font-bold tracking-wide">
                THE <span className="text-[var(--terminal-color)]">FIRST GATHERING</span>
              </h2>
              <div className="space-y-5 text-base leading-relaxed text-[var(--muted)]">
                <p>
                  Before Undermine, there was{' '}
                  <strong className="font-semibold text-[var(--foreground)]">
                    no organized gathering
                  </strong>{' '}
                  for people building hashrate heating systems — mining developers, home builders,
                  HVAC engineers, pleb miners, and hardware tinkerers were all working in isolation.
                  The first Heatpunk Summit brought{' '}
                  <strong className="font-semibold text-[var(--terminal-color)]">
                    ~150 of them into the same room
                  </strong>{' '}
                  for the very first time.
                </p>
                <p>
                  The name was intentional:{' '}
                  <em className="font-semibold not-italic text-[var(--foreground)]">
                    undermine the status quo
                  </em>{' '}
                  — bring bitcoin mining back home and turn it into useful heat. The takeaway from
                  two days of talks and demos:{' '}
                  <strong className="font-semibold text-[var(--foreground)]">
                    we needed to get organized.
                  </strong>{' '}
                  <span className="text-[var(--terminal-color)]">Heatpunks.org</span> and the{' '}
                  <span className="text-[var(--terminal-color)]">community forum</span> were born
                  directly from those conversations.
                </p>
              </div>
            </div>
            <div>
              <h3 className="mb-4 font-mono text-xs tracking-widest text-[var(--terminal-color)]">
                &gt; EVENT DETAILS
              </h3>
              <dl className="space-y-0 border-l-2 border-[var(--terminal-color)] bg-[var(--card-background)] px-5 py-2">
                <Detail label="EVENT" value={summit2025.name} strong />
                <Detail label="DATES" value="February 21–22, 2025" highlight />
                <Detail label="VENUE" value={`${summit2025.venue.name} — ${summit2025.venue.city}`} highlight />
                <Detail label="ADDRESS" value={summit2025.venue.address} />
                <Detail label="ATTENDEES" value={summit2025.stats.attendees} />
                <Detail label="LIVE DEMOS" value={summit2025.stats.demos} />
                <Detail label="TALKS" value="14 recorded sessions" />
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Recap + talks */}
      <section className="border-t border-[var(--card-border)] bg-[var(--card-background)] py-16 md:py-24">
        <div className="section-container">
          <div className="mb-8">
            <span className="section-tag">[002]</span>
            <h2 className="mt-2 font-mono text-2xl md:text-3xl font-bold tracking-wide">
              SUMMIT <span className="text-[var(--terminal-color)]">RECAP</span>
            </h2>
          </div>

          {/* Featured recap video */}
          <div className="mx-auto mb-12 max-w-4xl">
            <div className="border border-[var(--card-border)]">
              <VideoEmbed youtubeId={recapVideo.youtubeId} title={recapVideo.title} />
            </div>
          </div>

          {/* Talk recordings grid */}
          {talkVideos.length > 0 && (
            <div className="mx-auto max-w-5xl">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="font-mono text-xs tracking-wider text-[var(--terminal-color)]">
                  &gt; ALL TALKS ({talkVideos.length})
                </h3>
                <a
                  href={summit2025.youtubePlaylistUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[10px] text-[var(--terminal-color)] hover:underline"
                >
                  VIEW FULL PLAYLIST ↗
                </a>
              </div>
              <TalkGrid videos={talkVideos} />
            </div>
          )}
        </div>
      </section>

      {/* 2025 sponsors */}
      <SponsorRow2025 sponsors={sponsors2025} />

      {/* Community — shared component, scope green accent to this page only */}
      <div style={{ '--accent': 'var(--terminal-color)' } as CSSProperties}>
        <SummitCommunitySection />
      </div>

      {/* Cross-year navigation footer — orange CTAs */}
      <div className="border-t border-[var(--card-border)] bg-[var(--background)] py-8">
        <div className="section-container flex flex-col items-center justify-between gap-4 sm:flex-row">
          <span className="font-mono text-xs text-[var(--muted)]">← END OF ARCHIVE</span>
          <div className="flex items-center gap-4">
            <Link
              href="/summit/2026"
              className="font-mono text-sm text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
            >
              HPS 2026 ARCHIVE →
            </Link>
            <Link href="/summit" className="btn-primary group">
              <span className="relative z-10">ATTEND HPS 2027 →</span>
              <span className="btn-heat" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Detail({
  label,
  value,
  highlight = false,
  strong = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  strong?: boolean;
}) {
  return (
    <div className="flex gap-4 border-b border-[var(--card-border)] py-3 text-sm last:border-0">
      <dt className="w-24 shrink-0 pt-0.5 font-mono text-[10px] tracking-wider text-[var(--muted)]">
        {label}
      </dt>
      <dd
        className={
          highlight
            ? 'font-semibold text-[var(--terminal-color)]'
            : strong
              ? 'font-semibold text-[var(--foreground)]'
              : 'font-medium text-[var(--foreground)]'
        }
      >
        {value}
      </dd>
    </div>
  );
}
