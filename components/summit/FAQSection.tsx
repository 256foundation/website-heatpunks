import { FAQAccordion } from './FAQAccordion';
import type { FAQItem } from '@/types/schedule';

const faqItems2027: FAQItem[] = [
  {
    question: 'How much does a ticket cost?',
    answer: 'Tickets are $350 USD. You can pay in fiat or bitcoin. The purchase link is sent after we review your waitlist application — we curate attendance to keep the signal high.',
  },
  {
    question: 'What is the waitlist? Why not just sell tickets?',
    answer: 'The Heatpunk Summit is a working event, not a conference. We keep it small and hands-on by reviewing who attends. Join the waitlist, tell us about yourself and your work, and if you\'re a fit we\'ll send you the ticket link. If demand is high, we prioritize people who are actively building.',
  },
  {
    question: 'When and where is HPS 2027?',
    answer: 'February 26–27, 2027 at The Space in RiNo, Denver, Colorado. A ski day on February 25th is also being planned — details TBD.',
  },
  {
    question: 'What kind of people attend?',
    answer: 'Mining developers, firmware hackers, pleb builders, HVAC engineers, building professionals, architects, electricians, and serious hobbyists. The mix of mining expertise and building/heating expertise in the same room is what makes this event unique.',
  },
  {
    question: 'What should I bring?',
    answer: 'A laptop if you plan to participate in workshops. If you\'ve built something relevant — bring it. The demo floor is where ideas get real. Dress is casual.',
  },
  {
    question: 'Can I demo a product or project?',
    answer: 'Yes — reach out to admin@heatpunks.org with a description of what you\'d like to show. We prioritize live hardware and working builds over slides.',
  },
  {
    question: 'How do I get there?',
    answer: 'Denver International Airport (DEN) is about 40 minutes from the venue. The A Line train runs from DIA to downtown Denver. The Space is in the RiNo Art District, accessible via rideshare from downtown or a short walk from the 38th & Blake light rail station.',
  },
  {
    question: 'Is there sponsorship available?',
    answer: 'Yes — email admin@heatpunks.org with your interest. We don\'t have fixed tiers; reach out and we\'ll figure out what makes sense.',
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
