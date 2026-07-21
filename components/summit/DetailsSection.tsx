import type { Summit } from '@/types/schedule';

interface DetailsSectionProps {
  summit: Summit;
}

export function DetailsSection({ summit }: DetailsSectionProps) {
  return (
    <section className="bg-[var(--background)] py-16 md:py-24">
      <div className="section-container">
        <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
          {/* When */}
          <div className="border-l-[3px] border-l-[var(--heatpunk-yellow-color)] bg-[var(--card-background)] p-5">
            <h3 className="mb-3 font-mono text-xs text-[var(--heatpunk-yellow-color)]">&gt; WHEN</h3>
            <p className="text-sm leading-relaxed text-[var(--muted)]">
              <strong className="mb-1 block text-[var(--foreground)]">Feb 27–28, {summit.year}</strong>
              Pre-summit ski day and a public happy hour ran Feb 26. The summit itself ran two
              full days, with an evening activity each night — a RiNo beer garden dinner and a
              hot tub BBQ.
            </p>
          </div>

          {/* Where */}
          <div className="border-l-[3px] border-l-[var(--heatpunk-yellow-color)] bg-[var(--card-background)] p-5">
            <h3 className="mb-3 font-mono text-xs text-[var(--heatpunk-yellow-color)]">&gt; WHERE</h3>
            <p className="text-sm leading-relaxed text-[var(--muted)]">
              <strong className="mb-1 block text-[var(--foreground)]">{summit.venue.name}</strong>
              {summit.venue.address}
              <br />
              RiNo District — a short train ride from DIA.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
