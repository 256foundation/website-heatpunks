import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/data/site';
import { BookSection } from '@/components/education/BookSection';
import { VideoSection } from '@/components/education/VideoSection';
import { summit2026Videos, summit2025Videos } from '@/data/videos';

export const metadata: Metadata = {
  title: 'Resources',
  description: 'DIY guides and tutorials for building Bitcoin mining heaters. Learn how to turn hashrate into home heat.',
  openGraph: {
    title: 'Resources | Hashrate Heatpunks',
    description: 'DIY guides and tutorials for building Bitcoin mining heaters. Learn how to turn hashrate into home heat.',
    images: ['/api/og?title=Resources%20%26%20Guides&subtitle=DIY%20hashrate%20heating%20tutorials&page=education'],
  },
};

export default function EducationPage() {
  return (
    <div className="bg-[var(--background)]">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Flame background - uses theme-aware CSS class */}
        <div className="absolute inset-0 flame-bg" />
        <div className="noise-overlay" />

        <div className="relative z-10 section-container text-center">
          <span className="section-tag">[EDUCATION]</span>
          <h1 className="font-mono text-[clamp(2rem,8vw,4rem)] font-extrabold tracking-tight mb-4">
            <span className="text-flame-gradient">LEARN</span>{' '}
            <span className="text-[var(--foreground)]">HASHRATE HEATING</span>
          </h1>
          <p className="text-[var(--muted)] max-w-2xl mx-auto leading-relaxed mb-6">
            Explore our curated resources to understand how Bitcoin mining can be
            transformed into a valuable heat source for homes and businesses.
          </p>
          <Link
            href="/mission"
            className="font-mono text-xs text-[var(--terminal-color)] hover:text-[var(--accent)] transition-colors"
          >
            &gt; LEARN MORE ABOUT OUR MISSION
          </Link>
        </div>
      </section>

      <BookSection />
      <VideoSection year={2026} videos={summit2026Videos} sectionTag="[002]" />
      <VideoSection year={2025} videos={summit2025Videos} sectionTag="[003]" />

      {/* Summit Archives Section */}
      <section className="py-16 md:py-24 bg-[var(--card-background)] border-t border-[var(--card-border)]">
        <div className="section-container">
          <div className="mb-10">
            <span className="section-tag">[004]</span>
            <h2 className="font-mono text-2xl md:text-3xl font-bold tracking-wide mt-2">
              SUMMIT <span className="text-[var(--accent)]">ARCHIVES</span>
            </h2>
            <p className="text-[var(--muted)] text-sm mt-3 max-w-xl">
              Full schedules, recordings, and materials from past Heatpunk Summits.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl">
            <Link
              href="/summit/2026"
              className="heatpunk-card group hover:border-[var(--accent)] transition-all hover:-translate-y-0.5"
            >
              <span className="font-mono text-xl font-extrabold text-[var(--accent)]">2026</span>
              <p className="font-mono text-xs text-[var(--muted)] mt-1 mb-3">
                Full schedule, 5 workshops, recordings, 256 Foundation announcement
              </p>
              <span className="font-mono text-[10px] text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors">
                VIEW ARCHIVE →
              </span>
            </Link>
            <Link
              href="/summit/2025"
              className="heatpunk-card group hover:border-[var(--terminal-color)] transition-all hover:-translate-y-0.5"
            >
              <span className="font-mono text-xl font-extrabold text-[var(--terminal-color)]">2025</span>
              <p className="font-mono text-xs text-[var(--muted)] mt-1 mb-3">
                Undermine — 14 talks, recap film, the first gathering
              </p>
              <span className="font-mono text-[10px] text-[var(--muted)] group-hover:text-[var(--terminal-color)] transition-colors">
                VIEW ARCHIVE →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* More Resources Section */}
      <section className="py-16 md:py-24 bg-[var(--background-alt)] border-t border-[var(--card-border)]">
        <div className="section-container">
          <div className="mb-8">
            <span className="section-tag">[005]</span>
            <h2 className="font-mono text-2xl md:text-3xl font-bold tracking-wide mt-2 mb-4">
              MORE RESOURCES IN <span className="text-[var(--accent)]">DEVELOPMENT</span>
            </h2>
            <p className="text-[var(--muted)] text-sm leading-relaxed max-w-2xl mb-6">
              We&apos;re building the educational foundation for the hashrate heating industry.
              Tutorials, technical guides, installation documentation, safety standards —
              this content doesn&apos;t exist yet because we&apos;re the ones creating it.
            </p>
            <p className="text-[var(--muted)] text-sm leading-relaxed max-w-2xl mb-4">
              Want to help build this industry? The 256 Foundation funds educational content,
              documentation, and training materials through the Hashrate Heatpunk Grant Program.
              {!siteConfig.grants.open && (
                <>
                  {' '}The program is paused while we raise dedicated funding - donations are what bring
                  grants back.
                </>
              )}
            </p>
            <p className="text-sm text-[var(--muted)] leading-relaxed max-w-2xl">
              Support this work —{' '}
              <a
                href={siteConfig.foundation.donate}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)] hover:underline"
              >
                Donations to the 256 Foundation
              </a>{' '}
              fund free educational content for the hashrate heating industry.
            </p>
          </div>

          {siteConfig.grants.open ? (
            <Link href="/grants" className="btn-primary group">
              <span className="relative z-10">APPLY FOR A GRANT</span>
              <span className="btn-heat" />
            </Link>
          ) : (
            <a
              href={siteConfig.foundation.donate}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary group"
            >
              <span className="relative z-10">DONATE TO FUND GRANTS ↗</span>
              <span className="btn-heat" />
            </a>
          )}
        </div>
      </section>
    </div>
  );
}
