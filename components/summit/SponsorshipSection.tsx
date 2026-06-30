import Image from 'next/image';
import type { Sponsor } from '@/types/schedule';

interface SponsorshipSectionProps {
  pastSponsors?: Sponsor[];
  sponsorEmail?: string;
}

const defaultPastSponsors: Sponsor[] = [
  { name: 'Luxor', logo: '/images/summit/2025/sponsor-luxor.webp', url: 'https://luxor.tech' },
  { name: 'Braiins', logo: '/images/summit/2025/sponsor-braiins.webp', url: 'https://braiins.com' },
  { name: 'Compass Mining', logo: '/images/summit/2025/sponsor-compass.webp', url: 'https://compassmining.io' },
  { name: 'Build a Mine Podcast', logo: '/images/summit/2025/sponsor-bam.webp', url: 'https://bitcoinminingworld.com' },
];

export function SponsorshipSection({
  pastSponsors = defaultPastSponsors,
  sponsorEmail = 'admin@heatpunks.org',
}: SponsorshipSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-[var(--card-background)] border-t border-[var(--card-border)]">
      <div className="section-container">
        <div className="mb-12">
          <span className="section-tag">[005]</span>
          <h2 className="font-mono text-2xl md:text-3xl font-bold tracking-wide mt-2">
            BECOME A <span className="text-[var(--accent)]">SUPPORTER</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
          <div className="space-y-4 text-[var(--muted)] text-sm leading-relaxed">
            <p>
              The Heatpunk Summit exists because a few organizations believed in this community before it was organized. HPS 2027 is actively seeking sponsors and supporters.
            </p>
            <p>
              This is a focused, technical audience: mining developers, firmware hackers, HVAC engineers, building professionals, and serious hobbyists. People who are actually building systems, not just talking about it.
            </p>
            <p>
              Sponsoring gives you direct access to this community — on the floor, in the workshops, in the hallway conversations that don&apos;t get recorded. If your product or service is relevant to the open-source mining stack or hashrate heating, this is the event where the builders are.
            </p>
            <p>
              No tier packages or fixed menu. Reach out and we&apos;ll put together something that makes sense for both sides.
            </p>
            <a
              href={`mailto:${sponsorEmail}?subject=HPS 2027 Sponsorship Inquiry`}
              className="inline-block btn-primary group mt-2"
            >
              <span className="relative z-10">GET IN TOUCH</span>
              <span className="btn-heat" />
            </a>
          </div>

          <div>
            <h3 className="font-mono text-xs tracking-widest text-[var(--muted)] mb-4">PAST SUPPORTERS</h3>
            <div className="grid grid-cols-2 gap-3">
              {pastSponsors.map((sponsor) => (
                <a
                  key={sponsor.name}
                  href={sponsor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="heatpunk-card flex items-center justify-center h-20 hover:border-[var(--accent)] transition-colors"
                >
                  <Image
                    src={sponsor.logo}
                    alt={sponsor.name}
                    width={120}
                    height={48}
                    className="max-h-12 max-w-[120px] object-contain opacity-70 hover:opacity-100 transition-opacity filter invert"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
