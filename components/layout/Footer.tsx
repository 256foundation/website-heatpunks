import Link from 'next/link';
import { siteConfig } from '@/data/site';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--background)]">
      {/* Manifesto bar */}
      <div className="border-t border-[var(--card-border)] py-8 text-center">
        <p className="font-mono text-sm tracking-wider">
          <span className="block text-[var(--foreground)]">UNDERMINE THE STATUS QUO.</span>
          <span className="block text-[var(--accent)] animate-text-glow">THE FUTURE OF BITCOIN MINING IS AT HOME.</span>
        </p>
      </div>

      {/* Flame bar */}
      <div className="flame-bar mb-8" />

      {/* Donation bar */}
      <div className="section-container mb-16">
        <div className="border-l-4 border-l-[var(--accent)] bg-[var(--card-background)] border border-[var(--card-border)] px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="font-mono text-xs tracking-wider text-[var(--foreground)] mb-1">SUPPORT THE MISSION</p>
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              Hashrate Heatpunks is a community project under the 256 Foundation, a 501(c)(3) nonprofit. Donations fund safety standards, open-source tools, and free education. Accepts USD &amp; Bitcoin.
            </p>
          </div>
          <a
            href={siteConfig.foundation.donate}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline shrink-0 text-center"
          >
            DONATE ↗
          </a>
        </div>
      </div>

      {/* Main footer content */}
      <div className="section-container pt-20 pb-12 border-t border-[var(--card-border)]">
        <div className="grid grid-cols-1 mt-4 md:grid-cols-3 gap-8">
          {/* About / Attribution */}
          <div>
            <h3 className="font-mono text-xs tracking-wider text-[var(--terminal-color)] mb-4">&gt; ABOUT</h3>
            <p className="text-sm text-[var(--muted)] mb-4 leading-relaxed">
              Hashrate Heatpunks is a community project managed under the{' '}
              <a
                href={siteConfig.foundation.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)] hover:text-[var(--accent-light)] transition-colors"
              >
                {siteConfig.foundation.name}
              </a>
              , a 501(c)(3) nonprofit with the mission of {siteConfig.foundation.mission}.
            </p>
            <div className="flex gap-4 font-mono text-xs">
              <a
                href={siteConfig.foundation.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
              >
                [256.ORG]
              </a>
              <a
                href={siteConfig.foundation.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
              >
                [GITHUB]
              </a>
              <a
                href={siteConfig.foundation.donate}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)] hover:text-[var(--accent-light)] transition-colors"
              >
                [DONATE ↗]
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-mono text-xs tracking-wider text-[var(--terminal-color)] mb-4">&gt; NAVIGATE</h3>
            <nav className="flex flex-col gap-2">
              <Link
                href="/"
                className="font-mono text-xs text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
              >
                HOME
              </Link>
              <Link
                href="/mission"
                className="font-mono text-xs text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
              >
                MISSION
              </Link>
              <Link
                href="/education"
                className="font-mono text-xs text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
              >
                EDUCATION
              </Link>
              <Link
                href="/summit"
                className="font-mono text-xs text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
              >
                SUMMIT
              </Link>
            </nav>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-mono text-xs tracking-wider text-[var(--terminal-color)] mb-4">&gt; CONNECT</h3>
            <nav className="flex flex-col gap-2">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="font-mono text-xs text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
              >
                {siteConfig.contact.email.toUpperCase()}
              </a>
              <a
                href={siteConfig.links.forum}
                className="font-mono text-xs text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
              >
                COMMUNITY FORUM
              </a>
              <a
                href={siteConfig.links.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
              >
                TELEGRAM GROUP
              </a>
              <a
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
              >
                X / TWITTER
              </a>
              <a
                href={siteConfig.links.nostr}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
              >
                NOSTR
              </a>
            </nav>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 mb-8 pt-8 border-t border-[var(--card-border)]">
          <p className="font-mono text-[10px] text-[var(--muted)] text-center tracking-wider">
            &copy; {currentYear} HASHRATE HEATPUNKS — A PROJECT OF THE{' '}
            <a
              href={siteConfig.foundation.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent)] hover:text-[var(--accent-light)] transition-colors"
            >
              256 FOUNDATION
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
