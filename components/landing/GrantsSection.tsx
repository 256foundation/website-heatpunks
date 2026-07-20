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
            Grants are run by our parent nonprofit, the{' '}
            <a
              href={siteConfig.foundation.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--terminal-color)] hover:text-[var(--accent)] transition-colors"
            >
              256 Foundation
            </a>
            , which funds open-source Bitcoin mining and mining decentralization - and hashrate heating
            fits squarely within that mission. One condition: the Foundation funds{' '}
            <span className="text-[var(--foreground)]">open-source work only</span>, so whatever you
            build, document, or teach with a grant must be released publicly.
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
        <a
          href={siteConfig.foundation.grants}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary group"
        >
          <span className="relative z-10">SEE THE GRANT PROGRAM ↗</span>
          <span className="btn-heat" />
        </a>
      </div>
    </section>
  );
}
