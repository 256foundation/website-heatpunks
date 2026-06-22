import Link from 'next/link';
import { siteConfig } from '@/data/site';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Flame background gradient - uses theme-aware CSS class */}
      <div className="absolute inset-0 animate-flame-glow flame-bg" />

      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Scan lines */}
      <div className="scan-lines" />

      {/* Content */}
      <div className="relative z-10 section-container text-center py-24">
        {/* Title */}
        <h2 className="font-mono text-[clamp(1.5rem,6vw,3rem)] font-bold tracking-[0.3em] text-[var(--foreground)] opacity-90 mb-2">
          HASHRATE
        </h2>
        <h1 className="font-mono text-[clamp(2.5rem,12vw,7rem)] font-extrabold leading-none tracking-tight mb-6">
          <span className="text-flame-gradient animate-text-glow">HEATPUNKS</span>
        </h1>

        {/* Tagline */}
        <p className="font-mono text-xs tracking-[0.2em] text-[var(--terminal-color)] mb-8">
          {'// A COMMUNITY OF BUILDERS WORKING ON THE EMERGING HASHRATE HEATING INDUSTRY'}
        </p>

        {/* Meta info */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-10 font-mono text-xs text-[var(--muted)]">
          <span>
            <span className="text-[var(--accent)]">STATUS:</span>{' '}
            <span className="animate-blink">DEFINING THE INDUSTRY</span>
          </span>
          <span className="text-[var(--card-border)] hidden md:inline">|</span>
          <span>
            <span className="text-[var(--accent)]">MISSION:</span> BRING BITCOIN MINING BACK TO HOMES & BUSINESSES
          </span>
          <span className="text-[var(--card-border)] hidden md:inline">|</span>
          <span>
            PROJECT UNDER THE{' '}
            <a href={siteConfig.foundation.url} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] transition-colors">
              256 FOUNDATION
            </a>
            {' '}- 501(c)(3)
          </span>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <a
            href={siteConfig.foundation.donate}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary group"
          >
            SUPPORT THE MISSION ↗
          </a>
          <a
            href={siteConfig.links.forum}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            <span className="relative z-10">DIVE INTO FORUM</span>
            <span className="btn-heat" />
          </a>

          <a
            href={siteConfig.links.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            JOIN TELEGRAM
          </a>

          <Link href="/summit" className="btn-secondary">
            ATTEND SUMMIT
          </Link>

          <Link href="/education" className="btn-secondary">
            LEARN
          </Link>
        </div>

      </div>
    </section>
  );
}
