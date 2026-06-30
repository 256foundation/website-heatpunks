'use client';

import { useState } from 'react';
import { WaitlistModal } from './WaitlistModal';

export function Summit2027Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 animate-flame-glow flame-bg" />
        <div className="noise-overlay" />
        <div className="scan-lines" />

        <div className="relative z-10 text-center px-4 py-20">
          <div className="mb-2">
            <h1 className="font-mono text-[clamp(3rem,15vw,8rem)] font-extrabold leading-none tracking-[0.1em]">
              <span className="text-flame-gradient animate-text-glow">HEATPUNK</span>
            </h1>
            <h2 className="font-mono text-[clamp(1rem,4vw,1.5rem)] font-normal tracking-[0.3em] text-[var(--foreground)] opacity-90 mt-2">
              SUMMIT_2027
            </h2>
          </div>

          <p className="font-mono text-xs tracking-[0.2em] text-[var(--terminal-color)] mt-6">
            {'// UNDERMINING THE STATUS QUO'}
          </p>

          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mt-8 font-mono text-xs text-[var(--muted)]">
            <span>
              <span className="text-[var(--accent)]">DATE:</span> FEB 26-27, 2027
            </span>
            <span className="text-[var(--card-border)] hidden md:inline">|</span>
            <span>
              <span className="text-[var(--accent)]">LOC:</span> DENVER, CO
            </span>
            <span className="text-[var(--card-border)] hidden md:inline">|</span>
            <span>
              <span className="text-[var(--accent)]">TICKET:</span> $350 USD
            </span>
            <span className="text-[var(--card-border)] hidden md:inline">|</span>
            <span>
              <span className="text-[var(--accent)]">STATUS:</span>{' '}
              <span className="animate-blink">PLANNING</span>
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
            <button onClick={() => setIsModalOpen(true)} className="btn-primary group">
              <span className="relative z-10">JOIN THE WAITLIST</span>
              <span className="btn-heat" />
            </button>
            <a
              href={`mailto:admin@heatpunks.org?subject=HPS 2027 Sponsorship`}
              className="btn-secondary"
            >
              SPONSOR / DEMO INQUIRY
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--muted)]">SCROLL</span>
          <div className="w-px h-10 bg-gradient-to-b from-[var(--accent)] to-transparent animate-scroll-pulse" />
        </div>
      </section>

      {/* Stats bar — retrospective 2026 stats + 2027 forward info */}
      <div className="bg-[var(--background-alt)] border-t border-b border-[var(--card-border)] py-4 overflow-x-auto">
        <div className="flex justify-center gap-8 md:gap-16 px-4 min-w-max">
          <Stat value="3RD" label="ANNUAL" />
          <Stat value="150+" label="AT HPS26" />
          <Stat value="$350" label="TICKET" />
          <Stat value="THE SPACE" label="DENVER, CO" />
          <Stat value="FEB 26-27" label="2027" />
        </div>
      </div>

      <WaitlistModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} year={2027} />
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
