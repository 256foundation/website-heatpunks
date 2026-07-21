import Image from 'next/image';
import { siteConfig } from '@/data/site';

type PastSupporter = {
  name: string;
  url: string;
  /** Light/white logo — shown on the black chip in dark mode. */
  logo: string;
  /** Dark logo — shown on the white chip in light mode (falls back to `logo`). */
  logoDark?: string;
};

/** Curated past-supporter wall (HPS 2025 + 2026), deduped. No 2027 sponsors yet. */
const pastSupporters: PastSupporter[] = [
  { name: 'Compass Mining', url: 'https://compassmining.io', logo: '/images/sponsors/compass.png', logoDark: '/images/sponsors/compass-dark.png' },
  { name: 'Exergy', url: 'https://exergyheat.com', logo: '/images/sponsors/exergy.png', logoDark: '/images/sponsors/exergy-dark.png' },
  { name: 'Human Rights Foundation', url: 'https://hrf.org', logo: '/images/sponsors/hrf.png' },
  { name: 'Ocean', url: 'https://ocean.xyz', logo: '/images/sponsors/ocean.png' },
  { name: 'TESSERE', url: 'https://tessere.com', logo: '/images/sponsors/tessere.webp' },
  { name: 'Canaan', url: 'https://canaan.io', logo: '/images/sponsors/Canaan_logo_white.png', logoDark: '/images/sponsors/Canaan_logo_blue.png' },
  { name: 'Luxor', url: 'https://luxor.tech', logo: '/images/summit/2025/sponsor-luxor.webp' },
  { name: 'Braiins', url: 'https://braiins.com', logo: '/images/summit/2025/sponsor-braiins.webp' },
  { name: 'Build a Mine Podcast', url: 'https://bitcoinminingworld.com', logo: '/images/summit/2025/sponsor-bam.webp' },
];

export function SponsorshipSection() {
  const sponsorEmail = siteConfig.contact.email;

  return (
    <section className="py-16 md:py-24 bg-[var(--card-background)] border-t border-[var(--card-border)]">
      <div className="section-container">
        <div className="mb-12">
          <span className="section-tag">[006]</span>
          <h2 className="font-mono text-2xl md:text-3xl font-bold tracking-wide mt-2">
            SPONSOR HPS <span className="text-[var(--accent)]">2027</span>
          </h2>
        </div>

        <div className="max-w-3xl space-y-4 text-[var(--muted)] text-sm leading-relaxed">
          <p>
            The Heatpunk Summit draws the most dedicated builders in bitcoin mining and hashrate
            heating — firmware developers, hardware engineers, HVAC and building professionals,
            home miners, and policy experts. People who are actually building systems, not just
            talking about them.
          </p>
          <p>
            Sponsoring HPS 2027 puts your brand in front of this community with direct exposure on
            the demo floor, in the workshops, and in the hallway conversations that don&apos;t get
            recorded. No tier packages or fixed menu — reach out and we&apos;ll put together
            something that makes sense for both sides.
          </p>
          <a
            href={`mailto:${sponsorEmail}?subject=HPS 2027 Sponsorship Inquiry`}
            className="inline-block btn-primary group mt-2"
          >
            <span className="relative z-10">GET IN TOUCH</span>
            <span className="btn-heat" />
          </a>
        </div>

        {/* Past supporters — social proof (2025 + 2026), no 2027 sponsors yet */}
        <div className="mt-14 border-t border-[var(--card-border)] pt-10">
          <h3 className="font-mono text-xs tracking-widest text-[var(--muted)] mb-5">
            PAST SUMMIT SUPPORTERS
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
            {pastSupporters.map((sponsor) => (
              <a
                key={sponsor.name}
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                title={sponsor.name}
                className="flex h-16 items-center justify-center rounded-sm border px-4 transition-colors bg-white border-black/10 dark:bg-black dark:border-white/10 hover:border-[var(--accent)]"
              >
                <div className="relative h-8 w-full">
                  {/* Light/white logo — dark chip (dark mode) */}
                  <Image
                    src={sponsor.logo}
                    alt={sponsor.name}
                    fill
                    className={`object-contain ${sponsor.logoDark ? 'hidden dark:block' : ''}`}
                    sizes="120px"
                  />
                  {/* Dark logo — white chip (light mode) */}
                  {sponsor.logoDark && (
                    <Image
                      src={sponsor.logoDark}
                      alt={sponsor.name}
                      fill
                      className="object-contain dark:hidden"
                      sizes="120px"
                    />
                  )}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
