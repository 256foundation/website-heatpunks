import Image from 'next/image';
import { VideoEmbed } from '@/components/shared/VideoEmbed';

export function MilestonesSection() {
  return (
    <section className="border-t border-[var(--card-border)] bg-[var(--card-background)] py-16 md:py-24">
      <div className="section-container">
        <div className="mb-12">
          <span className="section-tag">[002]</span>
          <h2 className="mt-2 font-mono text-2xl font-bold tracking-wide md:text-3xl">
            WHAT <span className="text-[var(--heatpunk-yellow-color)]">HAPPENED</span> AT HPS 2026
          </h2>
        </div>

        <div className="grid items-stretch gap-6 lg:grid-cols-2">
          {/* 256 Foundation */}
          <div className="heatpunk-card flex flex-col">
            <h3 className="mb-3 font-mono text-sm font-bold tracking-wide text-[var(--heatpunk-yellow-color)]">
              HEATPUNKS FOUND A FORMAL HOME
            </h3>
            <p className="mb-6 text-sm leading-relaxed text-[var(--muted)]">
              At HPS 2026, Hashrate Heatpunks became a formal community project of the{' '}
              <strong className="text-[var(--foreground)]">256 Foundation</strong> — the 501(c)(3)
              nonprofit building the open-source Bitcoin mining stack. Summit host Tyler Stevens was
              named president of the Foundation&apos;s board. The community now has an organizational
              home and can apply for the{' '}
              <a
                href="https://www.256foundation.org/grants"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--heatpunk-yellow-color)] hover:underline"
              >
                Foundation&apos;s grant program
              </a>
              .
            </p>

            {/* Branded logo plate — matches the award video's footprint */}
            <a
              href="https://www.256foundation.org/mission"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative mt-auto flex aspect-video items-center justify-center overflow-hidden rounded-lg border border-[var(--card-border)] bg-[#080808]"
            >
              {/* brand glow */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'radial-gradient(ellipse 60% 60% at 50% 45%, rgba(249,237,50,0.20) 0%, transparent 70%)',
                }}
              />
              {/* faint circuit grid */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.10]"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(249,237,50,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(249,237,50,0.6) 1px, transparent 1px)',
                  backgroundSize: '30px 30px',
                }}
              />
              <Image
                src="/images/summit/2026/256-foundation-white.png"
                alt="256 Foundation"
                width={1000}
                height={292}
                className="relative w-[58%] max-w-[340px] transition-transform duration-300 group-hover:scale-[1.04]"
                sizes="(max-width: 1024px) 55vw, 340px"
              />
              <span className="absolute bottom-3 right-3 font-mono text-[10px] tracking-wider text-white/50 transition-colors group-hover:text-[var(--heatpunk-yellow-color)]">
                256FOUNDATION.ORG ↗
              </span>
            </a>
          </div>

          {/* Innovation Award */}
          <div className="heatpunk-card flex flex-col">
            <h3 className="mb-3 font-mono text-sm font-bold tracking-wide text-[var(--heatpunk-yellow-color)]">
              THE FIRST HEATPUNK INNOVATION AWARD
            </h3>
            <p className="mb-6 text-sm leading-relaxed text-[var(--muted)]">
              The inaugural award went to the <strong className="text-[var(--foreground)]">Snorkel
              × Hashrate House</strong> hot tub — a Snorkel cold-plunge/hot tub heated by a
              Bitcoin miner, built in partnership with Hashrate House, who built the immersion
              mining-heat element. It stole the show on the demo floor.
            </p>
            <div className="mb-6 flex flex-wrap items-center gap-4">
              <a
                href="https://snorkel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex h-12 w-36 items-center justify-center rounded bg-white px-4 opacity-90 transition-opacity hover:opacity-100"
              >
                <Image
                  src="/images/summit/2026/sponsor-snorkel.png"
                  alt="Snorkel"
                  fill
                  className="object-contain p-2"
                  sizes="144px"
                />
              </a>
              <a
                href="https://www.hashratehouse.com"
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex h-12 w-36 items-center justify-center rounded bg-white px-4 opacity-90 transition-opacity hover:opacity-100"
              >
                <Image
                  src="/images/summit/2026/sponsor-hashrate-house.png"
                  alt="Hashrate House"
                  fill
                  className="object-contain p-2"
                  sizes="144px"
                />
              </a>
            </div>
            <div className="mt-auto">
              <VideoEmbed
                youtubeId="dNKZhRVaXbM"
                title="Heatpunk Innovation Award Announcement"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
