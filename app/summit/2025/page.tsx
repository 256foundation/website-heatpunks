import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { VideoEmbed } from '@/components/shared/VideoEmbed';
import { VideoCarousel } from '@/components/shared/VideoCarousel';
import { SponsorGrid } from '@/components/summit/SponsorGrid';
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
    images: ['/images/summit/2025/hero.jpg'],
  },
};

export default function Summit2025Page() {
  const recapVideo = summit2025Videos[0];
  const talkVideos = summit2025Videos.slice(1);

  return (
    <div className="bg-[var(--black)]">
      {/* Archive banner */}
      <div className="bg-[var(--card-background)] border-b border-[var(--card-border)] py-2 px-4 text-center">
        <p className="font-mono text-[10px] tracking-widest text-[var(--muted)]">
          <span className="text-[var(--terminal-color)]">ARCHIVE</span> · HPS 2025 ·{' '}
          <Link href="/summit" className="text-[var(--accent)] hover:underline">
            VIEW HPS 2027 →
          </Link>
        </p>
      </div>

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        <Image
          src="/images/summit/2025/hero.jpg"
          alt="Undermine: Heatpunk Summit 2025"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
        <div className="noise-overlay" />

        <div className="relative z-10 section-container pb-16">
          <span className="font-mono text-[10px] tracking-widest text-[var(--terminal-color)]">
            FEBRUARY 21–22, 2025 · DENVER, CO
          </span>
          <h1 className="font-mono text-[clamp(2.5rem,10vw,6rem)] font-extrabold leading-none tracking-tight mt-2">
            <span className="text-[var(--terminal-color)]">UNDERMINE</span>
          </h1>
          <h2 className="font-mono text-lg md:text-2xl font-normal tracking-[0.2em] text-[var(--foreground)] opacity-80 mt-2">
            HEATPUNK SUMMIT 2025
          </h2>
          <p className="text-[var(--muted)] text-sm mt-4 max-w-xl">
            {summit2025.takeaway}
          </p>
        </div>
      </section>

      {/* Stats bar */}
      <div className="bg-[var(--background-alt)] border-t border-b border-[var(--card-border)] py-4 overflow-x-auto">
        <div className="flex justify-center gap-8 md:gap-16 px-4 min-w-max">
          <Stat value="~150" label="ATTENDEES" color="var(--terminal-color)" />
          <Stat value="2" label="DAYS" color="var(--terminal-color)" />
          <Stat value="10+" label="LIVE DEMOS" color="var(--terminal-color)" />
          <Stat value="4" label="SPONSORS" color="var(--terminal-color)" />
          <Stat value="14" label="TALKS" color="var(--terminal-color)" />
        </div>
      </div>

      {/* Origin story */}
      <section className="py-16 md:py-24 bg-[var(--background)] border-t border-[var(--card-border)]">
        <div className="section-container">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl">
            <div>
              <span className="section-tag">[001]</span>
              <h2 className="font-mono text-2xl md:text-3xl font-bold tracking-wide mt-2 mb-6">
                THE <span className="text-[var(--terminal-color)]">FIRST GATHERING</span>
              </h2>
              <div className="space-y-4 text-[var(--muted)] text-sm leading-relaxed">
                <p>
                  Before Heatpunk Summit 2025, there was no organized gathering for people building
                  hashrate heating systems. Mining developers, home builders, HVAC engineers, pleb miners,
                  and hardware tinkerers were scattered — working in isolation.
                </p>
                <p>
                  Undermine brought them together for the first time. Around 150 people in the same room
                  who had never met: mining firmware developers working alongside HVAC engineers, plumbers
                  exchanging ideas with hardware hackers, architects discussing specifications with pleb miners.
                </p>
                <p>
                  The name was intentional. <em>Undermine the status quo</em> — bring bitcoin mining back
                  home, turn it into useful heat, build the open ecosystem that makes that possible.
                </p>
                <p>
                  The takeaway from two days of talks, demos, and conversations: we needed to get organized.
                  Heatpunks.org and the community forum were born directly from those conversations.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-mono text-xs tracking-widest text-[var(--muted)] mb-4">EVENT DETAILS</h3>
              <div className="space-y-3">
                <Detail label="EVENT" value={summit2025.name} />
                <Detail label="DATES" value="February 21–22, 2025" />
                <Detail label="VENUE" value={`${summit2025.venue.name} — ${summit2025.venue.city}`} />
                <Detail label="ADDRESS" value={summit2025.venue.address} />
                <Detail label="ATTENDEES" value={summit2025.stats.attendees} />
                <Detail label="LIVE DEMOS" value={summit2025.stats.demos} />
                <Detail label="TALKS" value="14 recorded sessions" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recap video */}
      <section className="py-16 md:py-24 bg-[var(--card-background)] border-t border-[var(--card-border)]">
        <div className="section-container">
          <div className="mb-8">
            <span className="section-tag">[002]</span>
            <h2 className="font-mono text-2xl md:text-3xl font-bold tracking-wide mt-2">
              SUMMIT <span className="text-[var(--terminal-color)]">RECAP</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto mb-12">
            <div className="border border-[var(--card-border)]">
              <VideoEmbed youtubeId={recapVideo.youtubeId} title={recapVideo.title} />
            </div>
          </div>

          {/* Talk recordings */}
          {talkVideos.length > 0 && (
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-mono text-xs tracking-wider text-[var(--terminal-color)]">
                  &gt; ALL_TALKS ({talkVideos.length})
                </h3>
                <a
                  href={summit2025.youtubePlaylistUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[10px] text-[var(--accent)] hover:underline"
                >
                  VIEW FULL PLAYLIST ↗
                </a>
              </div>
              <VideoCarousel videos={talkVideos} />
            </div>
          )}
        </div>
      </section>

      {/* 2025 sponsors */}
      <SponsorGrid sponsors={sponsors2025} />

      {/* Community */}
      <SummitCommunitySection />

      {/* Navigation footer */}
      <div className="border-t border-[var(--card-border)] py-8 bg-[var(--background)]">
        <div className="section-container flex flex-col sm:flex-row gap-4 justify-between items-center">
          <span className="font-mono text-xs text-[var(--muted)]">← END OF ARCHIVE</span>
          <div className="flex gap-4">
            <Link
              href="/summit/2026"
              className="font-mono text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
            >
              HPS 2026 ARCHIVE →
            </Link>
            <Link href="/summit" className="btn-primary group">
              <span className="relative z-10">HPS 2027 →</span>
              <span className="btn-heat" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ value, label, color }: { value: string; label: string; color: string }) {
  return (
    <div className="text-center">
      <div className="font-mono text-xl md:text-2xl font-bold" style={{ color }}>
        {value}
      </div>
      <div className="font-mono text-[10px] tracking-[0.15em] text-[var(--muted)]">{label}</div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-4 text-sm">
      <span className="font-mono text-[10px] tracking-wider text-[var(--muted)] w-20 shrink-0 pt-0.5">
        {label}
      </span>
      <span className="text-[var(--foreground)]">{value}</span>
    </div>
  );
}
