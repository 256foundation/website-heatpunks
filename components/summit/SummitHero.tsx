'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Summit, Sponsor } from '@/types/schedule';
import { InvitationModal } from './InvitationModal';

interface SummitHeroProps {
  summit: Summit;
  sponsors?: Sponsor[];
  stats?: {
    workshops: number;
    demos: number;
  };
}

export function SummitHero({ summit, sponsors, stats }: SummitHeroProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const workshopCount = stats?.workshops ?? 4;
  const demoCount = stats?.demos ?? 10;

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Flame background gradient - uses theme-aware CSS class */}
        <div className="absolute inset-0 animate-flame-glow flame-bg" />

        {/* Noise overlay */}
        <div className="noise-overlay" />

        {/* Scan lines */}
        <div className="scan-lines" />

        <div className="relative z-10 text-center px-4 py-20">
          {/* Glitch Title */}
          <div className="mb-2">
            <h1 className="font-mono text-[clamp(3rem,15vw,8rem)] font-extrabold leading-none tracking-[0.1em]">
              <span className="text-flame-gradient animate-text-glow">HEATPUNK</span>
            </h1>
            <h2 className="font-mono text-[clamp(1rem,4vw,1.5rem)] font-normal tracking-[0.3em] text-[var(--foreground)] opacity-90 mt-2">
              SUMMIT_{summit.year}
            </h2>
          </div>

          {/* Tagline */}
          <p className="font-mono text-xs tracking-[0.2em] text-[var(--terminal-color)] mt-6">
            {'// UNDERMINING THE STATUS QUO'}
          </p>

          {/* Meta info */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mt-8 font-mono text-xs text-[var(--muted)]">
            <span>
              <span className="text-[var(--accent)]">DATE:</span> FEB 27-28, {summit.year}
            </span>
            <span className="text-[var(--card-border)] hidden md:inline">|</span>
            <span>
              <span className="text-[var(--accent)]">LOC:</span> DENVER, CO
            </span>
            <span className="text-[var(--card-border)] hidden md:inline">|</span>
            <span>
              <span className="text-[var(--accent)]">STATUS:</span>{' '}
              <span className="animate-blink">CONCLUDED</span>
            </span>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn-primary group"
            >
              <span className="relative z-10">JOIN THE HPS 2027 WAITLIST</span>
              <span className="btn-heat" />
            </button>

            <a
              href="/education"
              className="btn-secondary"
            >
              VIEW RECORDINGS
            </a>

            <a
              href="/summit/schedule"
              className="btn-secondary"
            >
              SUMMIT SCHEDULE
            </a>
          </div>

          {/* Featured Sponsors */}
          {sponsors && sponsors.length > 0 && (
            <div className="mt-12">
              <p className="font-mono text-[10px] tracking-[0.2em] text-[var(--muted)] mb-4">
                SPONSORED BY
              </p>
              <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
                {sponsors.map((sponsor) => (
                  <a
                    key={sponsor.name}
                    href={sponsor.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative h-8 w-24 md:h-10 md:w-32 opacity-70 hover:opacity-100 transition-opacity"
                    title={sponsor.name}
                  >
                    {/* Light logo (for dark mode) */}
                    <Image
                      src={sponsor.logo}
                      alt={sponsor.name}
                      fill
                      className={`object-contain ${
                        sponsor.logoDark ? 'hidden dark:block' : ''
                      }`}
                      sizes="128px"
                    />
                    {/* Dark logo (for light mode) */}
                    {sponsor.logoDark && (
                      <Image
                        src={sponsor.logoDark}
                        alt={sponsor.name}
                        fill
                        className="object-contain dark:hidden"
                        sizes="128px"
                      />
                    )}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--muted)]">SCROLL</span>
          <div className="w-px h-10 bg-gradient-to-b from-[var(--accent)] to-transparent animate-scroll-pulse" />
        </div>
      </section>

      {/* Stats Bar */}
      <div className="bg-[var(--background-alt)] border-t border-b border-[var(--card-border)] py-4 overflow-x-auto">
        <div className="flex justify-center gap-8 md:gap-16 px-4 min-w-max">
          <Stat value="2" label="DAYS" />
          <Stat value="150+" label="BUILDERS" />
          <Stat value={workshopCount.toString()} label="WORKSHOPS" />
          <Stat value="15+" label="DEMOS" />
          <Stat value="1" label="SKI DAY" />
        </div>
      </div>

      {/* Invitation Modal */}
      <InvitationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        year={summit.year}
      />
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="font-mono text-xl md:text-2xl font-bold text-[var(--accent)]">{value}</div>
      <div className="font-mono text-[10px] tracking-[0.15em] text-[var(--muted)]">{label}</div>
    </div>
  );
}
