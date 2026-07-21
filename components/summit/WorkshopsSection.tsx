import type { Session } from '@/types/schedule';
import { summit2026Videos } from '@/data/videos';

interface WorkshopsSectionProps {
  workshops: Session[];
}

// Short, past-tense summaries + the workshop's own recorded video.
const workshopDetails: Record<string, { summary: string; youtubeId: string }> = {
  'day1-workshop-home-assistant': {
    summary:
      "Led by Exergy's Dylan, builders integrated miners directly into Home Assistant — local automations triggered by thermostats, solar production, or energy prices. Zero cloud required.",
    youtubeId: 'k_x48ErmSh8',
  },
  'day2-workshop-boiler': {
    summary:
      "Walked through Exergy's real-world installation: a water-cooled Bitcoin miner heating The Space's radiant floors via a hydronic loop, and how to replicate boiler logic atop hashrate heating.",
    youtubeId: '4FEwVYIvvSU',
  },
  'day2-workshop-tether-sdk': {
    summary:
      "Tether's open-source Mining SDK team explored adapting their Holepunch-based P2P platform for thermostats, circulator pumps, and district heating systems.",
    youtubeId: 'EtJaUA2-okg',
  },
  'day1-workshop-architect': {
    summary:
      'Attendees worked one-on-one with leading firm TESSERE to outline industry standards: certification roadblocks, client education, and hybrid-system specifications.',
    youtubeId: 'j-a0Zuy4sDk',
  },
  'day2-workshop-canaan': {
    summary:
      "Direct access to Canaan's team — builders gave feedback on firmware flexibility, thermal design priorities, and hardware modularity to shape home-scale ASIC development.",
    youtubeId: 'Pm3yMge-VWo',
  },
};

const topics = [
  'Controlling Miners as Electric Heaters',
  'Pools, Shares & Intermittent Hashing',
  'Sizing Hashrate for Heat Demand',
  'Certifications & Building Code',
  'Open Sourcing the Mining Stack',
  'Penetrating the Heating Industry',
  'Sovereign Smart Homes',
  'Live Hardware Demonstrations',
  'Cross-Industry Q&A',
  'Educating the Trades',
];

export function WorkshopsSection({ workshops }: WorkshopsSectionProps) {
  return (
    <section className="relative border-t border-[var(--card-border)] bg-[var(--background)] py-16 md:py-24">
      <div className="section-container">
        {/* Section header */}
        <div className="mb-8">
          <span className="section-tag">[004]</span>
          <h2 className="mt-2 font-mono text-2xl font-bold tracking-wide md:text-3xl">
            WORKSHOPS &amp; <span className="text-[var(--heatpunk-yellow-color)]">TOPICS</span>
          </h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            HPS 2026 introduced hands-on workshops for the first time — dedicated sessions where
            builders tackled real-world problems together instead of just watching talks.
          </p>
        </div>

        {/* Workshops */}
        <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {workshops.length > 0 ? (
            workshops.map((workshop, index) => {
              const detail = workshopDetails[workshop.id];
              const video = detail
                ? summit2026Videos.find((v) => v.youtubeId === detail.youtubeId)
                : undefined;
              return (
                <div
                  key={workshop.id}
                  className="heatpunk-card hover:-translate-y-0.5 hover:border-[var(--heatpunk-yellow-color)]"
                >
                  <div className="mb-3 font-mono text-[10px] text-[var(--heatpunk-yellow-color)]">
                    {(index + 1).toString().padStart(2, '0')}
                  </div>
                  <h4 className="mb-2 font-mono text-sm font-semibold text-[var(--foreground)]">
                    {workshop.title}
                  </h4>
                  <p className="mb-3 text-xs leading-relaxed text-[var(--muted)]">
                    {detail?.summary || workshop.description}
                  </p>
                  {detail && video && (
                    <a
                      href={`https://www.youtube.com/watch?v=${detail.youtubeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[10px] text-[var(--heatpunk-yellow-color)] hover:underline"
                    >
                      WATCH ↗
                    </a>
                  )}
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center text-sm text-[var(--muted)]">
              Workshop details coming soon
            </div>
          )}
        </div>

        {/* Also covered */}
        <div>
          <h3 className="mb-4 font-mono text-xs tracking-wider text-[var(--heatpunk-yellow-color)]">
            &gt; ALSO COVERED
          </h3>
          <div className="grid max-w-3xl gap-x-8 sm:grid-cols-2">
            {topics.map((topic) => (
              <div
                key={topic}
                className="flex items-center border-b border-[var(--card-border)] py-2 text-sm text-[var(--muted)]"
              >
                <span className="mr-3 font-mono text-[var(--heatpunk-yellow-color)]">&gt;</span>
                {topic}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
