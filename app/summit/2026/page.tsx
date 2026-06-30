import type { Metadata } from 'next';
import Link from 'next/link';
import { SummitHero } from '@/components/summit/SummitHero';
import { AboutSection } from '@/components/summit/AboutSection';
import { InfoDeckSection } from '@/components/summit/InfoDeckSection';
import { SummitVideoSection } from '@/components/summit/SummitVideoSection';
import { WhyWhoSection } from '@/components/summit/WhyWhoSection';
import { WorkshopsSection } from '@/components/summit/WorkshopsSection';
import { TopicsSection } from '@/components/summit/TopicsSection';
import { HighlightsSection } from '@/components/summit/HighlightsSection';
import { DetailsSection } from '@/components/summit/DetailsSection';
import { VenueSection } from '@/components/summit/VenueSection';
import { SponsorGrid } from '@/components/summit/SponsorGrid';
import { FAQSection } from '@/components/summit/FAQSection';
import { SummitCommunitySection } from '@/components/summit/SummitCommunitySection';
import { getScheduleData, getSponsors } from '@/lib/schedule';
import { getSessionsByType } from '@/lib/scheduleUtils';
import type { FAQItem } from '@/types/schedule';

export const metadata: Metadata = {
  title: 'Summit 2026 Archive',
  description:
    'Heatpunk Summit 2026 archive — February 27-28 in Denver, CO. Full schedule, recordings, workshops, and sponsors from the second annual gathering.',
  openGraph: {
    title: 'Summit 2026 Archive | Hashrate Heatpunks',
    description:
      'Full archive of Heatpunk Summit 2026 — the second annual gathering of bitcoin mining and heating builders in Denver.',
    images: ['/images/summit/2026/hero.png'],
  },
};

const faq2026Items: FAQItem[] = [
  {
    question: 'How much did it cost to attend?',
    answer:
      '2026 general admission was 210,000 sats — paid in bitcoin. This included all sessions, meals, and the evening after-party.',
  },
  {
    question: 'What workshops were held?',
    answer:
      'Five hands-on workshops: Architect Standards (defining industry certifications), Boiler Room Tour (live bitcoin-heated radiant floor system), Home Assistant Integration, Canaan Feedback Session, and Tether Mining SDK.',
  },
  {
    question: 'What was announced at the 2026 summit?',
    answer:
      'The 256 Foundation — a 501(c)(3) non-profit — was announced at HPS 2026 to fund the open-source mining stack: FOSS firmware, open hardware reference designs, and a documented open-source pool implementation.',
  },
  {
    question: 'Were there live hardware demos?',
    answer:
      'Yes — multiple hashrate heating systems were demonstrated on the floor. More polished and diverse than 2025, including hydronic systems, space heaters, and custom control boards.',
  },
  {
    question: 'Was the ski day included?',
    answer:
      'The ski day on February 26th was optional and organized separately. Attendees arranged their own ski passes and transportation.',
  },
  {
    question: 'How do you get there?',
    answer:
      'Denver International Airport (DEN) is about 40 minutes from the venue. The A Line train runs from DIA to downtown Denver. The Space is in RiNo, accessible via rideshare or the 38th & Blake light rail station.',
  },
];

export default function Summit2026Page() {
  const scheduleData = getScheduleData();
  const sponsors = getSponsors();

  const workshops = getSessionsByType(scheduleData, 'workshop');
  const stats = {
    workshops: workshops.length,
    demos: getSessionsByType(scheduleData, 'demo').length,
  };

  return (
    <div className="bg-[var(--black)]">
      {/* Archive banner */}
      <div className="bg-[var(--card-background)] border-b border-[var(--card-border)] py-2 px-4 text-center">
        <p className="font-mono text-[10px] tracking-widest text-[var(--muted)]">
          <span className="text-[var(--accent)]">ARCHIVE</span> · HPS 2026 ·{' '}
          <Link href="/summit" className="text-[var(--accent)] hover:underline">
            VIEW HPS 2027 →
          </Link>
        </p>
      </div>

      {/* Hero with stats bar */}
      <SummitHero summit={scheduleData.summit} sponsors={sponsors} stats={stats} />

      {/* [001] About */}
      <AboutSection />

      {/* Overview Deck */}
      <InfoDeckSection />

      {/* [002] Summit Videos */}
      <SummitVideoSection />

      {/* Why + Who cards */}
      <WhyWhoSection />

      {/* [003] Workshops */}
      <WorkshopsSection workshops={workshops} />

      {/* [004] Topics */}
      <TopicsSection />

      {/* [005] Highlights */}
      <HighlightsSection />

      {/* When/Where Details */}
      <DetailsSection summit={scheduleData.summit} scheduleData={scheduleData} />

      {/* Interactive Map */}
      <VenueSection summit={scheduleData.summit} />

      {/* Sponsors */}
      <SponsorGrid sponsors={sponsors} />

      {/* [008] FAQ with 2026-specific items */}
      <FAQSection items={faq2026Items} sectionNumber="[006]" />

      {/* Community */}
      <SummitCommunitySection />

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
