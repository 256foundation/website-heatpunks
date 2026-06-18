import type { Metadata } from 'next';
import { HeroSection } from '@/components/grants/HeroSection';
import { WhySection } from '@/components/grants/WhySection';
import { CategoriesSection } from '@/components/grants/CategoriesSection';
import { ApplicationSection } from '@/components/grants/ApplicationSection';
import { FAQSection } from '@/components/grants/FAQSection';
import { DonateSection } from '@/components/grants/DonateSection';
import { ContactSection } from '@/components/grants/ContactSection';
import { grantFAQs } from '@/data/grants';

export const metadata: Metadata = {
  title: 'Grants',
  description: 'The Hashrate Heatpunk Grant Program funds builders, researchers, and educators advancing hashrate heating. Applications are currently paused while we raise dedicated funding.',
  openGraph: {
    title: 'Grants | Hashrate Heatpunks',
    description: 'The Hashrate Heatpunk Grant Program funds builders, researchers, and educators advancing hashrate heating. Applications are currently paused while we raise dedicated funding.',
    images: ['/api/og?title=Grants%20Program&subtitle=Funding%20for%20hashrate%20heating%20projects&page=grants'],
  },
};

// FAQ JSON-LD Schema
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: grantFAQs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

export default function GrantsPage() {
  return (
    <div className="bg-[var(--background)]">
      {/* FAQ JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HeroSection />
      <WhySection />
      <CategoriesSection />
      <ApplicationSection />
      <FAQSection />
      <DonateSection />
      <ContactSection />
    </div>
  );
}
