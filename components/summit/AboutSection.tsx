const attendees = [
  'ASIC Designers',
  'FOSS Devs',
  'System Builders',
  'Pleb Miners',
  'Home Builders',
  'Architects',
  'HVAC Techs',
  'Plumbers',
  'Insurers',
  'Energy Modelers',
  'Control Experts',
];

const whyTheyCame = [
  { title: 'Saw Innovation:', text: 'New systems, products, software, and live demos on the floor' },
  { title: 'Solved Challenges:', text: 'Builders tackled real-world hurdles together in hands-on workshops' },
  { title: 'Connected:', text: 'Met hyper-focused builders pushing hashrate heating forward' },
];

export function AboutSection() {
  return (
    <section className="border-t border-[var(--card-border)] bg-[var(--background)] py-16 md:py-24">
      <div className="section-container">
        {/* Section header */}
        <div className="mb-12">
          <span className="section-tag">[001]</span>
          <h2 className="mt-2 mb-4 font-mono text-2xl font-bold tracking-wide md:text-3xl">
            WHAT WAS <span className="text-[var(--heatpunk-yellow-color)]">HEATPUNK 2026</span>
          </h2>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Narrative */}
          <div>
            <p className="mb-4 text-lg leading-relaxed text-[var(--foreground)]">
              If 2025 was the spark — the first time this community had ever been in the same
              room — <span className="text-highlight">2026 was proof it stuck</span>. The
              Heatpunks came back organized: a website, a forum, and a full year of building
              behind them.
            </p>
            <p className="mb-8 text-sm leading-relaxed text-[var(--muted)]">
              For the first time, HPS introduced <strong className="text-[var(--foreground)]">hands-on
              workshops</strong> — not just talks and panels, but sessions where builders solved
              real problems together. More hashrate heating systems hit the demo floor than ever
              before, more polished than 2025&apos;s. And the <strong className="text-[var(--foreground)]">first-ever
              Heatpunk Innovation Award</strong> was handed out to the system that stole the show
              (more on that below).
            </p>

            <div>
              <h3 className="mb-4 font-mono text-xs tracking-wider text-[var(--heatpunk-yellow-color)]">
                &gt; WHY THEY CAME
              </h3>
              <ul className="space-y-3">
                {whyTheyCame.map((reason) => (
                  <li
                    key={reason.title}
                    className="border-l-2 border-[var(--card-border)] pl-4 text-sm text-[var(--muted)]"
                  >
                    <strong className="text-[var(--foreground)]">{reason.title}</strong> {reason.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Who was there */}
          <div>
            <h3 className="mb-4 font-mono text-xs tracking-wider text-[var(--heatpunk-yellow-color)]">
              &gt; WHO WAS THERE
            </h3>
            <div className="flex flex-wrap gap-2">
              {attendees.map((tag) => (
                <span key={tag} className="heatpunk-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
