'use client';

import { useState } from 'react';
import { siteConfig } from '@/data/site';
import { WaitlistModal } from './WaitlistModal';

export function Summit2027Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="relative flex md:min-h-screen items-center justify-center overflow-hidden">
        <div className="absolute inset-0 animate-flame-glow flame-bg" />
        <div className="noise-overlay" />
        <div className="scan-lines" />

        {/* Event-poster card */}
        <div className="relative z-10 w-full max-w-2xl px-4 py-10 sm:py-16 md:py-20">
          <div className="relative border border-[var(--card-border)] bg-[var(--background)]/80 backdrop-blur-sm p-6 sm:p-10 shadow-[0_0_60px_rgba(255,107,0,0.12)]">
            {/* Corner ticks — poster/ticket framing */}
            <span className="pointer-events-none absolute -top-px -left-px h-4 w-4 border-t-2 border-l-2 border-[var(--accent)]" />
            <span className="pointer-events-none absolute -top-px -right-px h-4 w-4 border-t-2 border-r-2 border-[var(--accent)]" />
            <span className="pointer-events-none absolute -bottom-px -left-px h-4 w-4 border-b-2 border-l-2 border-[var(--accent)]" />
            <span className="pointer-events-none absolute -bottom-px -right-px h-4 w-4 border-b-2 border-r-2 border-[var(--accent)]" />

            {/* Eyebrow */}
            <p className="font-mono text-xs tracking-[0.3em] text-[var(--terminal-color)]">
              {'// ACCELERATE'}
            </p>

            {/* Wordmark */}
            <h1 className="mt-4 font-mono font-extrabold leading-[0.9] tracking-tight">
              <span className="block text-[clamp(1.75rem,7vw,3rem)] text-[var(--foreground)]">
                HEATPUNK SUMMIT
              </span>
              <span className="mt-1 block text-[clamp(4rem,22vw,9rem)] text-flame-gradient animate-text-glow">
                2027
              </span>
            </h1>

            {/* Date / location */}
            <p className="mt-6 font-mono text-sm sm:text-base font-bold tracking-[0.15em] text-[var(--foreground)]">
              FEB 26–27, 2027
              <span className="mx-2 text-[var(--card-border)]">·</span>
              DENVER, CO
            </p>

            {/* Ticket */}
            <p className="mt-2 font-mono text-xs sm:text-sm tracking-[0.1em] text-[var(--muted)]">
              <span className="text-[var(--accent)]">$350</span> · PAY IN FIAT OR BITCOIN
            </p>

            {/* Status chip */}
            <div className="mt-5 inline-flex items-center gap-2 border border-[var(--terminal-color)]/40 px-3 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--terminal-color)] animate-blink" />
              <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--terminal-color)]">
                WAITLIST OPEN
              </span>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button onClick={() => setIsModalOpen(true)} className="btn-primary group">
                <span className="relative z-10">JOIN THE WAITLIST</span>
                <span className="btn-heat" />
              </button>
              <a
                href={`mailto:${siteConfig.contact.email}?subject=HPS 2027 Sponsorship`}
                className="btn-secondary text-center"
              >
                SPONSOR / DEMO INQUIRY
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--muted)]">SCROLL</span>
          <div className="w-px h-10 bg-gradient-to-b from-[var(--accent)] to-transparent animate-scroll-pulse" />
        </div>
      </section>

      {/* Stats bar — retrospective + forward info */}
      <div className="bg-[var(--background-alt)] border-t border-b border-[var(--card-border)] py-4 overflow-x-auto">
        <div className="flex justify-center gap-8 md:gap-16 px-4 min-w-max">
          <Stat value="3RD" label="ANNUAL" />
          <Stat value="150+" label="AT HPS26" />
          <Stat value="$350" label="TICKET" />
          <Stat value="FEB 26-27" label="2027" />
          <Stat value="THE SPACE" label="DENVER, CO" />
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
