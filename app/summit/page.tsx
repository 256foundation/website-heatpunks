import type { Metadata } from 'next';
import { Summit2027Hero } from '@/components/summit/Summit2027Hero';
import { WhyAttendSection } from '@/components/summit/WhyAttendSection';
import { WhatToExpectSection } from '@/components/summit/WhatToExpectSection';
import { Details2027Section } from '@/components/summit/Details2027Section';
import { RegistrationSection } from '@/components/summit/RegistrationSection';
import { SponsorshipSection } from '@/components/summit/SponsorshipSection';
import { PastSummitsSection } from '@/components/summit/PastSummitsSection';
import { FAQSection } from '@/components/summit/FAQSection';
import { ManifestoSection } from '@/components/summit/ManifestoSection';
import { SummitCommunitySection } from '@/components/summit/SummitCommunitySection';

export const metadata: Metadata = {
  title: 'Summit 2027',
  description:
    'Heatpunk Summit 2027 — February 26–27 in Denver, CO. The third annual gathering of bitcoin mining and heating builders. Join the waitlist.',
  openGraph: {
    title: 'Heatpunk Summit 2027 | Hashrate Heatpunks',
    description:
      'Third annual gathering of bitcoin mining and heating builders — Feb 26–27, 2027 in Denver, CO.',
    images: ['/api/og?title=HEATPUNK%20SUMMIT&subtitle=FEB%2026-27%2C%202027%20%E2%80%A2%20DENVER%2C%20CO&page=summit'],
  },
};

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

      {/* [001] Hero — dates, location, waitlist CTA, stats bar */}
      <Summit2027Hero />

      {/* [002] Why attend — three-summit arc */}
      <WhyAttendSection />

      {/* [003] What to expect — talks, workshops, demos, networking */}
      <WhatToExpectSection />

      {/* [004] Event details — dates, venue, map */}
      <Details2027Section />

      {/* [007] Registration — join the waitlist */}
      <RegistrationSection />

      {/* [005] Sponsorship pitch + past sponsors */}
      <SponsorshipSection />

      {/* [006] Past summits archive links */}
      <PastSummitsSection />

      {/* [008] FAQ */}
      <FAQSection />

      {/* Manifesto */}
      <ManifestoSection />

      {/* Community links */}
      <SummitCommunitySection />
    </div>
  );
}
