const summitArc = [
  {
    year: '2025',
    label: 'THE SPARK',
    headline: 'The First Gathering',
    body: 'The first Heatpunk Summit brought together mining developers, pleb builders, tinkerers, firmware hackers, and heating and building experts for the first time ever. Around 150 people in the same room who had never met. The takeaway: we needed to get organized. That gathering led directly to heatpunks.org, the community forum, and everything since.',
    color: 'var(--terminal-color)',
  },
  {
    year: '2026',
    label: 'THE FOUNDATION',
    headline: 'Formalizing the Movement',
    body: 'The second summit showed what organization looks like. More polished demo systems. More expertise. Professionals from ASHRAE and the DOE. Mining firmware developers. Building engineers. The 256 Foundation — a 501(c)(3) — was announced at this summit to fund the open-source mining stack: FOSS firmware, open hardware reference designs, and a documented open-source mining pool implementation.',
    color: 'var(--accent)',
  },
  {
    year: '2027',
    label: 'THE PROOF',
    headline: 'Results. Documentation. More Builders.',
    body: 'The FOSS firmware is in the wild, hacked onto closed-source miners by heatpunks everywhere. Case studies have been written. The hardware building blocks exist. HPS 2027 is the year we show what has been built, document what works, and push the industry forward with evidence. Come ready to share what you\'ve done and learn from everyone else who\'s been building.',
    color: 'var(--flame)',
  },
];

export function WhyAttendSection() {
  return (
    <section className="py-16 md:py-24 bg-[var(--card-background)] border-t border-[var(--card-border)]">
      <div className="section-container">
        <div className="mb-12">
          <span className="section-tag">[002]</span>
          <h2 className="font-mono text-2xl md:text-3xl font-bold tracking-wide mt-2">
            WHY <span className="text-[var(--accent)]">ATTEND</span>
          </h2>
          <p className="text-[var(--muted)] text-sm mt-3 max-w-xl">
            Three years. Three chapters. Each summit built on the last.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {summitArc.map((item) => (
            <div key={item.year} className="heatpunk-card flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="font-mono text-2xl font-extrabold"
                  style={{ color: item.color }}
                >
                  {item.year}
                </span>
                <span className="font-mono text-[10px] tracking-widest text-[var(--muted)] border border-[var(--card-border)] px-2 py-0.5">
                  {item.label}
                </span>
              </div>
              <h3 className="font-mono text-sm font-bold tracking-wide text-[var(--foreground)] mb-3">
                {item.headline}
              </h3>
              <p className="text-[var(--muted)] text-sm leading-relaxed flex-1">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
