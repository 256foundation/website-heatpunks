import { siteConfig } from '@/data/site';

const impacts = [
  {
    key: 'OPEN_STANDARDS',
    label: 'OPEN STANDARDS',
    description: 'Safety certifications & building code research',
  },
  {
    key: 'FREE_EDUCATION',
    label: 'FREE EDUCATION',
    description: 'Books, videos, and tutorials for anyone',
  },
  {
    key: 'GRANTS_PROGRAM',
    label: 'GRANTS PROGRAM',
    description: 'Funding builders and researchers',
  },
  {
    key: 'ANNUAL_SUMMIT',
    label: 'ANNUAL SUMMIT',
    description: 'Bringing the community together',
  },
];

export function DonateSection() {
  return (
    <section className="py-16 md:py-24 bg-[var(--background-alt)] border-t border-[var(--card-border)]">
      <div className="section-container">
        <div className="mb-8">
          <span className="section-tag">[005]</span>
          <h2 className="font-mono text-2xl md:text-3xl font-bold tracking-wide mt-2 mb-4">
            SUPPORT THE <span className="text-[var(--accent)]">MISSION</span>
          </h2>
          <p className="text-[var(--muted)] max-w-2xl leading-relaxed mb-6">
            We&apos;re a community project of the 256 Foundation — a 501(c)(3) nonprofit building the infrastructure this industry needs.
            Every donation directly funds:
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-3 max-w-2xl mb-8">
          {impacts.map((item) => (
            <div
              key={item.key}
              className="bg-[var(--card-background)] border border-[var(--card-border)] p-4 border-l-2 border-l-[var(--accent)]"
            >
              <p className="font-mono text-xs text-[var(--terminal-color)] mb-1">
                &gt; {item.label}
              </p>
              <p className="text-sm text-[var(--muted)]">{item.description}</p>
            </div>
          ))}
        </div>

        <p className="font-mono text-xs text-[var(--muted)] mb-6">
          Tax-deductible for US donors. USD &amp; Bitcoin accepted via Zaprite.
        </p>

        <div className="flex flex-wrap gap-3">
          <a
            href={siteConfig.foundation.donate}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary group"
          >
            <span className="relative z-10">DONATE ↗</span>
            <span className="btn-heat" />
          </a>
          <a
            href={siteConfig.foundation.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            LEARN ABOUT THE 256 FOUNDATION ↗
          </a>
        </div>
      </div>
    </section>
  );
}
