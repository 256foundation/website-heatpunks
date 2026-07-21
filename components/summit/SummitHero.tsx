'use client';

import { useState } from 'react';
import Image from 'next/image';
import { WaitlistModal } from './WaitlistModal';

interface SummitHeroProps {
  workshopCount: number;
  sponsorCount: number;
}

export function SummitHero({ workshopCount, sponsorCount }: SummitHeroProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="relative flex min-h-[68vh] items-end overflow-hidden pt-16 pb-16 md:pt-20 md:pb-0">
        {/* Thermal-camera hero photo (2026 event branding) */}
        <Image
          src="/images/summit/2026/hero-thermal.jpg"
          alt="Thermal camera image of a Bitcoin ASIC miner glowing with heat"
          fill
          priority
          sizes="100vw"
          className="object-cover object-bottom"
        />
        {/* Dark scrim so text stays legible over the photo in any theme */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
        <div className="noise-overlay" />

        <div className="section-container relative z-10 py-16 md:py-20">
          {/* PAST EVENT badge */}
          <span className="inline-block border border-[var(--heatpunk-yellow)] px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-[var(--heatpunk-yellow)]">
            PAST EVENT
          </span>

          {/* Eyebrow */}
          <p className="mt-6 font-mono text-xs tracking-[0.2em] text-[var(--heatpunk-yellow)]">
            FEBRUARY 27–28, 2026 · DENVER, CO
          </p>

          {/* Wordmark */}
          <h1 className="mt-2 font-mono text-[clamp(2.5rem,10vw,6rem)] font-extrabold leading-[0.95] tracking-tight text-[var(--heatpunk-yellow)]">
            HEATPUNK
            <br />
            <span className="inline-block -skew-x-6">SUMMIT 2026</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-4 max-w-xl font-mono text-sm text-white/80">
            The second gathering. The community came back organized — and found a formal home
            under the 256 Foundation.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <button onClick={() => setIsModalOpen(true)} className="btn-primary group">
              <span className="relative z-10">JOIN THE HPS 2027 WAITLIST</span>
              <span className="btn-heat" />
            </button>
            <a
              href="#recap"
              className="btn-secondary text-center !border-white/50 !text-white backdrop-blur-sm !bg-black/25 transition-colors hover:!border-white hover:!bg-black/40"
            >
              WATCH THE RECORDINGS
            </a>
            <a
              href="#schedule"
              className="btn-secondary text-center !border-white/50 !text-white backdrop-blur-sm !bg-black/25 transition-colors hover:!border-white hover:!bg-black/40"
            >
              FULL SCHEDULE
            </a>
          </div>

          {/* Stats bar */}
          <div className="mt-12 flex flex-wrap gap-8 md:gap-12">
            <Stat value="150+" label="ATTENDEES" />
            <Stat value="2" label="DAYS" />
            <Stat value={workshopCount.toString()} label="WORKSHOPS" />
            <Stat value="14+" label="DEMOS" />
            <Stat value={sponsorCount.toString()} label="SPONSORS" />
          </div>
        </div>
      </section>

      <WaitlistModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} year={2027} />
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-mono text-xl font-bold text-[var(--heatpunk-yellow)] md:text-2xl">
        {value}
      </div>
      <div className="font-mono text-[10px] tracking-[0.15em] text-white/70">{label}</div>
    </div>
  );
}
