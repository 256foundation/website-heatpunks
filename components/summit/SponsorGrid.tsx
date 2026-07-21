import Image from 'next/image';
import type { Sponsor } from '@/types/schedule';

interface SponsorGridProps {
  sponsors: Sponsor[];
}

export function SponsorGrid({ sponsors }: SponsorGridProps) {
  return (
    <section className="py-16 md:py-24 bg-[var(--card-background)] border-t border-[var(--card-border)]">
      <div className="section-container">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="section-tag">[006]</span>
          <h3 className="font-mono text-2xl md:text-3xl font-bold tracking-wide mt-2 mb-4">
            HPS 2026 <span className="text-[var(--heatpunk-yellow-color)]">SPONSORS</span> — THANK YOU.
          </h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {sponsors.map((sponsor) => (
            <a
              key={sponsor.name}
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              className="heatpunk-card flex items-center justify-center p-6 min-h-[120px] group"
            >
              {sponsor.logo ? (
                <div className="relative w-full h-12">
                  {/* Light logo (for dark mode) */}
                  <Image
                    src={sponsor.logo}
                    alt={sponsor.name}
                    fill
                    className={`object-contain opacity-80 group-hover:opacity-100 transition-opacity ${
                      sponsor.logoDark ? 'hidden dark:block' : ''
                    }`}
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  {/* Dark logo (for light mode) */}
                  {sponsor.logoDark && (
                    <Image
                      src={sponsor.logoDark}
                      alt={sponsor.name}
                      fill
                      className="object-contain opacity-80 group-hover:opacity-100 transition-opacity dark:hidden"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                  )}
                </div>
              ) : (
                <span className="font-mono text-xs tracking-wider text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors text-center">
                  {sponsor.name}
                </span>
              )}
            </a>
          ))}
        </div>

        {/* Cross-year sponsor CTA */}
        <div className="mt-12 pt-8 border-t border-[var(--card-border)] text-center">
          <p className="font-mono text-xs text-[var(--muted)]">
            Want to sponsor the next summit?{' '}
            <a
              href="/summit"
              className="text-[var(--accent)] hover:text-[var(--accent-light)] transition-colors"
            >
              → HPS 2027
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
