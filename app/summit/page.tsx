import { Summit2027Hero } from '@/components/summit/Summit2027Hero';
import { WhyAttendSection } from '@/components/summit/WhyAttendSection';
import { BarriersSection } from '@/components/summit/BarriersSection';
import { WhatToExpectSection } from '@/components/summit/WhatToExpectSection';
import { Details2027Section } from '@/components/summit/Details2027Section';
import { RegistrationSection } from '@/components/summit/RegistrationSection';
import { SponsorshipSection } from '@/components/summit/SponsorshipSection';
import { PastSummitsSection } from '@/components/summit/PastSummitsSection';
import { FAQSection } from '@/components/summit/FAQSection';
import { ManifestoSection } from '@/components/summit/ManifestoSection';
import { SummitCommunitySection } from '@/components/summit/SummitCommunitySection';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata('summit');

const eventSchema = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'Heatpunk Summit 2027',
  description:
    'Annual gathering of hashrate heating builders, featuring talks, workshops, demos, and networking.',
  startDate: '2027-02-26',
  endDate: '2027-02-27',
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  location: {
    '@type': 'Place',
    name: 'The Space',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '3700 N Franklin St',
      addressLocality: 'Denver',
      addressRegion: 'CO',
      postalCode: '80205',
      addressCountry: 'US',
    },
  },
  organizer: {
    '@type': 'Organization',
    name: 'Hashrate Heatpunks',
    url: 'https://heatpunks.org',
  },
  offers: {
    '@type': 'Offer',
    availability: 'https://schema.org/InStock',
    price: '350',
    priceCurrency: 'USD',
    url: 'https://heatpunks.org/summit',
  },
};

export default function SummitPage() {
  return (
    <div className="bg-[var(--black)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />

      {/* Hero — event-poster card, dates/price, waitlist CTA, stats bar */}
      <Summit2027Hero />

      {/* [001] Why attend — three-summit arc, ending on ACCELERATE */}
      <WhyAttendSection />

      {/* [002] The barriers are gone — open-source stack + public data (centerpiece) */}
      <BarriersSection />

      {/* [003] What to expect — 2027 programming + call for demos/workshops/talks */}
      <WhatToExpectSection />

      {/* [004] Event details — dates, venue, map, travel */}
      <Details2027Section />

      {/* [005] Registration — join the waitlist */}
      <RegistrationSection />

      {/* [006] Sponsorship pitch + past supporters */}
      <SponsorshipSection />

      {/* [007] Past summits archive links */}
      <PastSummitsSection />

      {/* [008] FAQ */}
      <FAQSection />

      {/* Manifesto */}
      <ManifestoSection />

      {/* [009] Community links */}
      <SummitCommunitySection sectionTag="[009]" />
    </div>
  );
}
