import { FAQAccordion } from './FAQAccordion';
import type { FAQItem } from '@/types/schedule';
import { siteConfig } from '@/data/site';

const faqItems2027: FAQItem[] = [
  {
    question: 'How much does a ticket cost?',
    answer: 'Tickets are $350 USD, payable in fiat or bitcoin. The purchase link is sent after we review your waitlist application — we curate attendance to keep the signal high.',
  },
  {
    question: 'What is the waitlist? Why not just sell tickets?',
    answer: 'The Heatpunk Summit is a working event, not a conference. We keep it small and hands-on by reviewing who attends. Join the waitlist, tell us about yourself and your work, and if you\'re a fit we\'ll send you the ticket link. If demand is high, we prioritize people who are actively building.',
  },
  {
    question: 'When and where is HPS 2027?',
    answer: 'February 26–27, 2027 at The Space in RiNo, Denver, Colorado. An optional pre-summit ski day on February 25th is also planned — details to follow, so check back.',
  },
  {
    question: 'What\'s included in the ticket?',
    answer: 'Your $350 ticket covers meals during the summit, the after-party, and full access to all talks, workshops, and the demo floor. The optional ski day and your travel and lodging are not included.',
  },
  {
    question: 'Where should I stay, and how do I get there?',
    answer: 'From Denver International Airport (DEN), take the RTD A Line train to the 38th & Blake station — the venue is about a 7-minute walk from there. We recommend the Catbird Hotel (roughly a 4-minute walk from the venue and 3 minutes from the train stop). Otherwise, anywhere in RiNo or downtown Denver puts you close.',
  },
  {
    question: 'What kind of people attend?',
    answer: 'Mining developers, firmware hackers, pleb builders, HVAC engineers, building professionals, architects, electricians, policy folks, and serious hobbyists. The mix of mining expertise and building/heating expertise in the same room is what makes this event unique.',
  },
  {
    question: 'What should I bring?',
    answer: 'A laptop if you plan to participate in workshops. If you\'ve built something relevant — bring it. The demo floor is where ideas get real. Dress is casual.',
  },
  {
    question: 'Can I demo, lead a workshop, or give a talk?',
    answer: `Yes — email ${siteConfig.contact.email} describing what you'd like to show or lead. We prioritize live hardware and working builds over slides.`,
  },
  {
    question: 'Are sessions recorded?',
    answer: 'Yes. Sessions from previous summits were recorded and posted to YouTube, and they\'re linked from our Education page. We plan to record HPS 2027 as well.',
  },
  {
    question: 'Is there sponsorship available?',
    answer: `Yes — email ${siteConfig.contact.email} with your interest. We don't have fixed tiers; reach out and we'll figure out what makes sense.`,
  },
];

interface FAQSectionProps {
  items?: FAQItem[];
  sectionNumber?: string;
}

export function FAQSection({ items = faqItems2027, sectionNumber = '[008]' }: FAQSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-[var(--background)]">
      <div className="section-container">
        <div className="mb-12">
          <span className="section-tag">{sectionNumber}</span>
          <h2 className="font-mono text-2xl md:text-3xl font-bold tracking-wide mt-2 mb-4">
            FREQUENTLY ASKED <span className="text-[var(--accent)]">QUESTIONS</span>
          </h2>
        </div>

        <div className="max-w-3xl">
          <FAQAccordion items={items} />
        </div>
      </div>
    </section>
  );
}
