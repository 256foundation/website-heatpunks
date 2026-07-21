import { summit2025 } from '@/data/summit2025';

const stats = [
  { value: summit2025.stats.attendees, label: 'ATTENDEES' },
  { value: String(summit2025.stats.days), label: 'DAYS' },
  { value: summit2025.stats.demos, label: 'LIVE DEMOS' },
  { value: String(summit2025.stats.sponsors), label: 'SPONSORS' },
  { value: '14', label: 'TALKS' },
];

export function Summit2025Hero() {
  return (
    <section className="relative flex min-h-[80vh] items-end overflow-hidden bg-gradient-to-b from-[var(--background)] to-[var(--background-alt)]">
      {/* Fan / turbine motif (echoes the 2025 poster + a mining fan) */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden="true"
      >
        <FanMotif />
      </div>
      <div className="noise-overlay" />

      <div className="relative z-10 section-container w-full pb-16 pt-28">
        <span className="font-mono text-[10px] md:text-xs tracking-[0.25em] text-[var(--terminal-color)]">
          FEBRUARY 21–22, 2025 · DENVER, CO
        </span>

        {/* Metallic UNDER | MINE lockup */}
        <h1 className="mt-3 font-mono text-[clamp(3rem,13vw,8rem)] font-extrabold leading-none tracking-tight">
          <span className="hps25-metallic">UNDER</span>
          <span className="mx-2 md:mx-4 align-middle font-light text-[var(--terminal-color)]">|</span>
          <span className="hps25-metallic">MINE</span>
        </h1>

        <h2 className="mt-3 font-mono text-base md:text-2xl font-normal tracking-[0.25em] text-[var(--foreground)] opacity-80">
          HEATPUNK SUMMIT 2025
        </h2>

        <p className="mt-4 max-w-xl text-sm leading-relaxed text-[var(--muted)]">
          {summit2025.tagline}
        </p>

        {/* Stats integrated into the hero */}
        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 md:gap-x-14">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="font-mono text-2xl md:text-3xl font-bold text-[var(--terminal-color)]">
                {stat.value}
              </div>
              <div className="font-mono text-[10px] tracking-[0.15em] text-[var(--muted)]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Concentric-grille fan with an X crosshair and four mounting points — a clean
 *  SVG re-creation of the 2025 poster's turbine motif. Slowly rotates. */
function FanMotif() {
  const rings = [28, 56, 84, 112, 140, 168];
  return (
    <svg
      viewBox="0 0 400 400"
      className="hps25-fan-spin h-[min(120vw,860px)] w-[min(120vw,860px)] opacity-[0.08]"
      fill="none"
      stroke="var(--foreground)"
      strokeWidth={1.4}
    >
      {rings.map((r) => (
        <circle key={r} cx="200" cy="200" r={r} />
      ))}
      {/* X crosshair */}
      <line x1="60" y1="60" x2="340" y2="340" />
      <line x1="340" y1="60" x2="60" y2="340" />
      {/* Four mounting points at the crosshair ends */}
      <circle cx="60" cy="60" r="16" />
      <circle cx="340" cy="60" r="16" />
      <circle cx="60" cy="340" r="16" />
      <circle cx="340" cy="340" r="16" />
      {/* Hub */}
      <circle cx="200" cy="200" r="10" fill="var(--foreground)" stroke="none" />
    </svg>
  );
}
