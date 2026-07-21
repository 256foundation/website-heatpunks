import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import Link from 'next/link';
import { SummitHero } from '@/components/summit/SummitHero';
import { AboutSection } from '@/components/summit/AboutSection';
import { MilestonesSection } from '@/components/summit/MilestonesSection';
import { SummitVideoSection } from '@/components/summit/SummitVideoSection';
import { WorkshopsSection } from '@/components/summit/WorkshopsSection';
import { DetailsSection } from '@/components/summit/DetailsSection';
import { Schedule2026 } from '@/components/summit/Schedule2026';
import { SponsorGrid } from '@/components/summit/SponsorGrid';
import { SummitCommunitySection } from '@/components/summit/SummitCommunitySection';
import { getScheduleData, getSponsors } from '@/lib/schedule';
import { getSessionsByType } from '@/lib/scheduleUtils';

export const metadata: Metadata = {
  title: 'Summit 2026 Archive',
  description:
    'Heatpunk Summit 2026 archive — February 27-28 in Denver, CO. The second annual gathering: Hashrate Heatpunks became a formal project of the 256 Foundation, workshops debuted, and the first Heatpunk Innovation Award was given out.',
  openGraph: {
    title: 'Summit 2026 Archive | Hashrate Heatpunks',
    description:
      'The second gathering. The community came back organized — full schedule, recordings, and sponsors from HPS 2026.',
    images: [
      '/api/og?title=HEATPUNK%20SUMMIT%202026&subtitle=The%20second%20gathering%20%E2%80%94%20Denver%2C%20Feb%202026&page=summit',
    ],
  },
};

export default function Summit2026Page() {
  const scheduleData = getScheduleData();
  const sponsors = getSponsors();
  const workshops = getSessionsByType(scheduleData, 'workshop');

  return (
    <div className="bg-[var(--background)]">
      {/* Archive banner */}
      <div className="bg-[var(--card-background)] border-b border-[var(--card-border)] py-2 px-4 text-center">
        <p className="font-mono text-[10px] tracking-widest text-[var(--muted)]">
          <span className="text-[var(--accent)]">ARCHIVE</span> · HPS 2026 ·{' '}
          <Link href="/summit" className="text-[var(--accent)] hover:underline">
            VIEW HPS 2027 →
          </Link>
        </p>
      </div>

      {/* Hero */}
      <SummitHero workshopCount={workshops.length} sponsorCount={sponsors.length} />

      {/* [001] What was Heatpunk 2026 */}
      <AboutSection />

      {/* Milestones — 256 Foundation + Innovation Award */}
      <MilestonesSection />

      {/* [002] Summit recap + talks */}
      <SummitVideoSection />

      {/* [003] Workshops + topics */}
      <WorkshopsSection workshops={workshops} />

      {/* Event details */}
      <DetailsSection summit={scheduleData.summit} />

      {/* Full schedule */}
      <Schedule2026 scheduleData={scheduleData} />

      {/* Sponsors */}
      <SponsorGrid sponsors={sponsors} />

      {/* Community — scope accent to the 2026 yellow signature on this page only */}
      <div style={{ '--accent': 'var(--heatpunk-yellow-color)' } as CSSProperties}>
        <SummitCommunitySection />
      </div>

      {/* Navigation footer */}
      <div className="border-t border-[var(--card-border)] py-8 bg-[var(--background)]">
        <div className="section-container flex flex-col sm:flex-row gap-4 justify-between items-center">
          <Link
            href="/summit/2025"
            className="font-mono text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
          >
            ← HPS 2025 ARCHIVE
          </Link>
          <Link href="/summit" className="btn-primary group">
            <span className="relative z-10">HPS 2027 →</span>
            <span className="btn-heat" />
          </Link>
        </div>
      </div>
    </div>
  );
}
