import Link from 'next/link';

const summits = [
  {
    year: 2026,
    name: 'Heatpunk Summit 2026',
    href: '/summit/2026',
    color: 'var(--accent)',
    description: 'The 256 Foundation was announced. More polished demos, more experts. ASHRAE and DOE professionals on the floor. The year the movement formalized.',
    stat1: { value: '150+', label: 'ATTENDEES' },
    stat2: { value: '5', label: 'WORKSHOPS' },
  },
  {
    year: 2025,
    name: 'Undermine: HPS 2025',
    href: '/summit/2025',
    color: 'var(--terminal-color)',
    description: 'The first gathering. Mining developers, pleb builders, and heating experts in the same room for the first time. The spark that led to Heatpunks.org.',
    stat1: { value: '~150', label: 'ATTENDEES' },
    stat2: { value: '10+', label: 'LIVE DEMOS' },
  },
];

export function PastSummitsSection() {
  return (
    <section className="py-16 md:py-24 bg-[var(--background)] border-t border-[var(--card-border)]">
      <div className="section-container">
        <div className="mb-12">
          <span className="section-tag">[006]</span>
          <h2 className="font-mono text-2xl md:text-3xl font-bold tracking-wide mt-2">
            SUMMIT <span className="text-[var(--accent)]">ARCHIVES</span>
          </h2>
          <p className="text-[var(--muted)] text-sm mt-3 max-w-xl">
            Full recordings, schedules, and materials from previous summits.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 max-w-3xl">
          {summits.map((summit) => (
            <Link
              key={summit.year}
              href={summit.href}
              className="heatpunk-card group flex flex-col gap-4 hover:border-[var(--accent)] transition-all hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-2xl font-extrabold" style={{ color: summit.color }}>
                  {summit.year}
                </span>
                <span className="font-mono text-[10px] text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors">
                  VIEW ARCHIVE →
                </span>
              </div>
              <div>
                <h3 className="font-mono text-sm font-bold text-[var(--foreground)] mb-2">{summit.name}</h3>
                <p className="text-[var(--muted)] text-xs leading-relaxed">{summit.description}</p>
              </div>
              <div className="flex gap-6 mt-auto pt-2 border-t border-[var(--card-border)]">
                <div>
                  <div className="font-mono text-sm font-bold" style={{ color: summit.color }}>
                    {summit.stat1.value}
                  </div>
                  <div className="font-mono text-[10px] text-[var(--muted)]">{summit.stat1.label}</div>
                </div>
                <div>
                  <div className="font-mono text-sm font-bold" style={{ color: summit.color }}>
                    {summit.stat2.value}
                  </div>
                  <div className="font-mono text-[10px] text-[var(--muted)]">{summit.stat2.label}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
