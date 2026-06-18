import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/data/site';

export const metadata: Metadata = {
  title: 'Mission',
  description: 'Our mission: make hashrate heating accessible to everyone. Learn about our vision for sustainable Bitcoin mining heat reuse.',
  openGraph: {
    title: 'Mission | Hashrate Heatpunks',
    description: 'Our mission: make hashrate heating accessible to everyone. Learn about our vision for sustainable Bitcoin mining heat reuse.',
    images: ['/api/og?title=Our%20Mission&subtitle=Making%20hashrate%20heating%20accessible%20to%20everyone&page=mission'],
  },
};

const beliefs = [
  {
    title: 'Mining should be distributed',
    description: 'The future of Bitcoin security is millions of small miners, not a handful of mega-facilities.',
  },
  {
    title: 'Heat is a product, not waste',
    description: 'Every watt of mining produces useful heat. Capture it.',
  },
  {
    title: 'Open source wins',
    description: 'Standards, documentation, and tools should be free and accessible to everyone.',
  },
  {
    title: 'The industry doesn\'t exist yet',
    description: 'There are no safety certifications, no building codes, no training programs. We\'re creating them.',
  },
  {
    title: 'Bitcoin fixes this',
    description: 'Hashrate heating aligns incentives for decentralization, energy efficiency, and individual sovereignty.',
  },
];

const problems = [
  'No UL/CE safety certifications for hashrate heating appliances',
  'Building codes don\'t recognize this technology',
  'HVAC professionals have no training or resources',
  'Limited real-world case studies and performance data',
];

const approaches = [
  {
    title: 'Build community',
    description: 'Forum, Telegram, annual Summit',
  },
  {
    title: 'Create education',
    description: 'Free books, videos, tutorials',
  },
  {
    title: 'Fund development',
    description: 'Grants for standards, research, documentation',
  },
  {
    title: 'Connect industries',
    description: 'Bridging Bitcoin mining and HVAC/heating',
  },
];

export default function MissionPage() {
  return (
    <div className="bg-[var(--background)]">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 flame-bg" />
        <div className="noise-overlay" />

        <div className="relative z-10 section-container text-center">
          <span className="section-tag">[MISSION]</span>
          <h1 className="font-mono text-[clamp(2rem,8vw,4rem)] font-extrabold tracking-tight mb-6">
            <span className="text-flame-gradient">OUR</span>{' '}
            <span className="text-[var(--foreground)]">MISSION</span>
          </h1>
          <p className="text-[var(--foreground)] text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-medium mb-4">
            &ldquo;Marry the bitcoin mining and heating sectors to accelerate the adoption of hashrate heating by building the standards,
            education, and community infrastructure needed to bring mining back to homes and businesses.&rdquo;
          </p>
          <p className="text-[var(--muted)] max-w-2xl mx-auto leading-relaxed">
            <span className="text-[var(--terminal-color)]">VISION:</span> A world where bitcoin mining is synonymous with electric heating. Where hashrate is decentralized back into homes and businesses - offsetting heating costs and securing the network.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-16 md:py-24 bg-[var(--background)]">
        <div className="section-container">
          <div className="mb-8">
            <span className="section-tag">[001]</span>
            <h2 className="font-mono text-2xl md:text-3xl font-bold tracking-wide mt-2 mb-4">
              WHO WE <span className="text-[var(--accent)]">ARE</span>
            </h2>
          </div>

          <div className="max-w-3xl">
            <p className="text-[var(--foreground)] text-lg leading-relaxed mb-6">
              We are <strong className="text-[var(--accent)]">Hashrate Heatpunks</strong> — a community
              of bitcoiners, tradesmen, engineers, builders, and advocates united by a radical idea:
            </p>
            <p className="font-mono text-xl md:text-2xl text-[var(--terminal-color)] mb-6">
              Bitcoin mining heat is a product, not a problem.
            </p>
            <p className="text-[var(--muted)] leading-relaxed">
              We reject the notion that mining must happen in remote warehouses, controlled by industrial
              operators. We believe hashrate belongs at home — in water heaters, space heaters, pools,
              greenhouses, industrial processes and more.
            </p>
          </div>
        </div>
      </section>

      {/* What We Believe */}
      <section className="py-16 md:py-24 bg-[var(--background-alt)] border-t border-[var(--card-border)]">
        <div className="section-container">
          <div className="mb-12">
            <span className="section-tag">[002]</span>
            <h2 className="font-mono text-2xl md:text-3xl font-bold tracking-wide mt-2 mb-4">
              WHAT WE <span className="text-[var(--accent)]">BELIEVE</span>
            </h2>
          </div>

          <div className="space-y-4 max-w-3xl">
            {beliefs.map((belief, index) => (
              <div
                key={index}
                className="bg-[var(--card-background)] border-l-[3px] border-l-[var(--accent)] p-5"
              >
                <div className="flex items-start gap-4">
                  <span className="font-mono text-sm text-[var(--terminal-color)] flex-shrink-0">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-mono text-sm font-bold text-[var(--foreground)] mb-1">
                      {belief.title.toUpperCase()}
                    </h3>
                    <p className="text-sm text-[var(--muted)] leading-relaxed">
                      {belief.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-16 md:py-24 bg-[var(--background)]">
        <div className="section-container">
          <div className="mb-8">
            <span className="section-tag">[003]</span>
            <h2 className="font-mono text-2xl md:text-3xl font-bold tracking-wide mt-2 mb-4">
              THE <span className="text-[var(--accent)]">PROBLEM</span>
            </h2>
            <p className="text-[var(--muted)] max-w-2xl">
              Hashrate heating has massive potential but faces real barriers:
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 max-w-3xl">
            {problems.map((problem, index) => (
              <div
                key={index}
                className="bg-[var(--card-background)] border border-[var(--card-border)] p-4"
              >
                <p className="text-sm text-[var(--foreground)] flex items-start gap-3">
                  <span className="text-[var(--accent)] font-mono">✗</span>
                  {problem}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-16 md:py-24 bg-[var(--background-alt)] border-t border-[var(--card-border)]">
        <div className="section-container">
          <div className="mb-8">
            <span className="section-tag">[004]</span>
            <h2 className="font-mono text-2xl md:text-3xl font-bold tracking-wide mt-2 mb-4">
              OUR <span className="text-[var(--accent)]">APPROACH</span>
            </h2>
            <p className="text-[var(--muted)] max-w-2xl">
              We&apos;re a project of the{' '}
              <a
                href={siteConfig.foundation.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--terminal-color)] hover:text-[var(--accent)] transition-colors"
              >
                256 Foundation
              </a>
              , a 501(c)(3) nonprofit with the mission of {siteConfig.foundation.mission}.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 max-w-3xl">
            {approaches.map((approach, index) => (
              <div
                key={index}
                className="bg-[var(--card-background)] border border-[var(--card-border)] p-5"
              >
                <div className="font-mono text-xs text-[var(--terminal-color)] mb-2">
                  &gt; {approach.title.toUpperCase().replace(/ /g, '_')}
                </div>
                <h3 className="font-mono text-sm font-bold text-[var(--foreground)] mb-1">
                  {approach.title}
                </h3>
                <p className="text-sm text-[var(--muted)]">
                  {approach.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-[var(--background)] border-t border-[var(--card-border)]">
        <div className="section-container">
          <div className="mb-8">
            <span className="section-tag">[005]</span>
            <h2 className="font-mono text-2xl md:text-3xl font-bold tracking-wide mt-2 mb-4">
              JOIN THE <span className="text-[var(--accent)]">MOVEMENT</span>
            </h2>
            <p className="text-[var(--muted)] max-w-2xl">
              Whether you&apos;re a builder, researcher, HVAC professional, or just someone who
              believes in decentralized mining — there&apos;s a place for you here.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {siteConfig.grants.open && (
              <Link href="/grants" className="btn-primary group">
                <span className="relative z-10">APPLY FOR A GRANT</span>
                <span className="btn-heat" />
              </Link>
            )}
            <a
              href={siteConfig.foundation.donate}
              target="_blank"
              rel="noopener noreferrer"
              className={siteConfig.grants.open ? 'btn-outline' : 'btn-primary group'}
            >
              {siteConfig.grants.open ? (
                'SUPPORT THE MISSION ↗'
              ) : (
                <>
                  <span className="relative z-10">SUPPORT THE MISSION ↗</span>
                  <span className="btn-heat" />
                </>
              )}
            </a>
            <Link href="/education" className="btn-secondary">
              LEARN MORE
            </Link>
            <a
              href={siteConfig.links.forum}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              JOIN THE FORUM
            </a>
            <a
              href={siteConfig.links.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              TELEGRAM
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
