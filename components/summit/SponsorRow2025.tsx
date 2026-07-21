import Image from 'next/image';
import Link from 'next/link';
import type { Sponsor } from '@/types/schedule';

interface SponsorRow2025Props {
  sponsors: Sponsor[];
}

/** 2025-scoped sponsor section. Centered auto-fit row so any count stays
 *  balanced (avoids the shared SponsorGrid's orphaned-card problem). Green
 *  signature heading; the cross-year sponsor CTA stays orange. */
export function SponsorRow2025({ sponsors }: SponsorRow2025Props) {
  return (
    <section className="border-t border-[var(--card-border)] bg-[var(--card-background)] py-16 md:py-24">
      <div className="section-container">
        <div className="mb-12 text-center">
          <span className="section-tag">[003]</span>
          <h3 className="mt-2 mb-4 font-mono text-2xl md:text-3xl font-bold tracking-wide">
            SUMMIT <span className="text-[var(--terminal-color)]">SPONSORS</span>
          </h3>
          <p className="text-sm text-[var(--muted)]">
            Thank you to the sponsors who made the first gathering possible.
          </p>
        </div>

        {/* Centered auto-fit row — wraps naturally, stays balanced */}
        <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-4">
          {sponsors.map((sponsor) => (
            <a
              key={sponsor.name}
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              className="heatpunk-card group flex h-28 w-full max-w-[240px] flex-1 basis-[200px] items-center justify-center p-6"
            >
              {sponsor.logo ? (
                <div className="relative h-14 w-full">
                  <Image
                    src={sponsor.logo}
                    alt={sponsor.name}
                    fill
                    className="object-contain opacity-80 transition-opacity group-hover:opacity-100"
                    sizes="240px"
                  />
                </div>
              ) : (
                <span className="text-center font-mono text-sm tracking-wider text-[var(--muted)] transition-colors group-hover:text-[var(--terminal-color)]">
                  {sponsor.name}
                </span>
              )}
            </a>
          ))}
        </div>

        {/* Cross-year sponsor CTA — orange, points to the upcoming summit */}
        <div className="mt-12 border-t border-[var(--card-border)] pt-8 text-center">
          <p className="font-mono text-xs text-[var(--muted)]">
            <span className="text-[var(--terminal-color)]">&gt;</span> Want to sponsor the next
            summit?{' '}
            <Link
              href="/summit"
              className="text-[var(--accent)] transition-colors hover:text-[var(--accent-light)]"
            >
              Sponsor HPS 2027 →
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
