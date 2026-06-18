import Link from 'next/link';
import { siteConfig } from '@/data/site';

const grantFocusAreas = [
  { icon: '⚡', label: 'STANDARDS' },
  { icon: '📊', label: 'RESEARCH' },
  { icon: '📖', label: 'DOCUMENTATION' },
  { icon: '🎓', label: 'EDUCATION' },
];

export function GrantsSection() {
  return (
    <section className="py-16 md:py-24 bg-[var(--card-background)]">
      <div className="section-container">
        {/* Section header */}
        <div className="mb-8">
          <span className="section-tag">[003]</span>
          <h2 className="font-mono text-2xl md:text-3xl font-bold tracking-wide">
            FUND THE <span className="text-[var(--accent)]">FUTURE</span>
          </h2>
          <p className="text-[var(--muted)] mt-2 text-sm max-w-2xl">
            The Hashrate Heatpunk Grant Program funds foundational work accelerating open-source mining and
            hashrate heating - standards, research, documentation, and education.
            {!siteConfig.grants.open && (
              <>
                {' '}Applications are paused while we raise dedicated funding; your donation is what brings
                them back.
              </>
            )}
          </p>
        </div>

        {/* Focus areas */}
        <div className="flex flex-wrap gap-2 mb-8">
          {grantFocusAreas.map((area) => (
            <span key={area.label} className="heatpunk-tag flex items-center gap-2">
              <span className="text-[var(--terminal-color)]">{area.icon}</span>
              {area.label}
            </span>
          ))}
        </div>

        {/* CTA */}
        {siteConfig.grants.open ? (
          <Link href="/grants" className="btn-primary group">
            <span className="relative z-10">APPLY FOR GRANT</span>
            <span className="btn-heat" />
          </Link>
        ) : (
          <div className="flex flex-wrap gap-3">
            <a
              href={siteConfig.foundation.donate}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary group"
            >
              <span className="relative z-10">DONATE TO FUND GRANTS ↗</span>
              <span className="btn-heat" />
            </a>
            <Link href="/grants" className="btn-outline">
              PROGRAM DETAILS
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
