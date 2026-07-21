import { siteConfig } from '@/data/site';

const stack = [
  {
    title: 'Open-source firmware',
    body: 'The historic barrier. Closed mining firmware locked builders out — now it runs free on real hardware, hacked onto miners by heatpunks everywhere.',
  },
  {
    title: 'Hashboard reference designs',
    body: 'Open schematics and layouts for the boards that do the work. Fork them, spin your own, build for heat.',
  },
  {
    title: 'Control board reference designs',
    body: 'The brains of the machine, documented and open. No reverse-engineering required.',
  },
  {
    title: 'Mining pool implementations',
    body: 'Open, documented pool software. Point your hashrate where you want it — no permission needed.',
  },
];

const dataArtifacts = [
  'Case studies',
  'Research papers',
  'Policy briefs',
  'Playbooks',
];

export function BarriersSection() {
  return (
    <section className="border-t border-[var(--card-border)] bg-[var(--background)] py-16 md:py-24">
      <div className="section-container">
        {/* Part A — the stack is open */}
        <div className="mb-12">
          <span className="section-tag">[002]</span>
          <h2 className="mt-2 font-mono text-2xl md:text-3xl font-bold tracking-wide">
            THE BARRIERS ARE <span className="text-[var(--accent)]">GONE</span>
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[var(--foreground)]">
            For years, one thing blocked builders more than anything else:{' '}
            <span className="text-highlight">closed mining firmware</span>. That barrier is gone.
            The 256 Foundation has released the open-source mining stack into the wild — and paired
            with modern AI coding tools, there has never been less standing between an idea and a
            working build.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {stack.map((item) => (
            <a
              key={item.title}
              href={siteConfig.foundation.github}
              target="_blank"
              rel="noopener noreferrer"
              className="heatpunk-card group flex flex-col hover:border-[var(--accent)] transition-colors"
            >
              <div className="mb-2 flex items-center justify-between gap-3">
                <h3 className="font-mono text-sm font-bold tracking-wide text-[var(--foreground)]">
                  <span className="text-[var(--terminal-color)]">&gt; </span>
                  {item.title}
                </h3>
                <span className="font-mono text-[10px] text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors">
                  OPEN ↗
                </span>
              </div>
              <p className="text-sm leading-relaxed text-[var(--muted)]">{item.body}</p>
            </a>
          ))}
        </div>

        {/* Kicker */}
        <p className="mt-10 font-mono text-2xl md:text-4xl font-extrabold tracking-tight text-[var(--flame)] text-flame-gradient">
          So what will you build?
        </p>

        {/* Part B — the data is public */}
        <div className="mt-16 border-t border-[var(--card-border)] pt-12">
          <h3 className="font-mono text-xl md:text-2xl font-bold tracking-wide">
            AND THE DATA IS <span className="text-[var(--accent)]">PUBLIC</span>
          </h3>
          <div className="mt-4 grid gap-8 lg:grid-cols-2">
            <p className="text-sm leading-relaxed text-[var(--muted)]">
              It is no longer just firmware and hardware. The last year produced real, public
              evidence — case studies, research papers, policy briefs, and build playbooks, all out
              in the open. HPS 2027 puts that record on the table and asks the questions that move
              the industry forward: <strong className="text-[var(--foreground)]">What does the data
              actually show? What is still missing</strong> for residential, commercial, and
              regulatory adoption? Whether you build systems, model buildings, or write policy —
              this is where the numbers get pressure-tested.
            </p>
            <div>
              <h4 className="mb-4 font-mono text-xs tracking-wider text-[var(--terminal-color)]">
                &gt; NOW PUBLIC
              </h4>
              <div className="flex flex-wrap gap-2">
                {dataArtifacts.map((tag) => (
                  <span key={tag} className="heatpunk-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
