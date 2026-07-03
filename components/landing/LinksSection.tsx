import { siteConfig } from '@/data/site';

export function LinksSection() {
  return (
    <section className="py-16 md:py-24 bg-[var(--background)] border-t border-b border-[var(--card-border)]">
      <div className="section-container">
        {/* Section header */}
        <div className="mb-12">
          <span className="section-tag">[002]</span>
          <h2 className="font-mono text-2xl md:text-3xl font-bold tracking-wide">
            JOIN THE COMMUNITY
          </h2>
          <p className="text-[var(--muted)] mt-2 text-sm">
            Connect with heatpunks worldwide. Share builds, ask questions, stay updated.
          </p>
        </div>

        {/* Community links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl">
          {/* Forum */}
          <a
            href={siteConfig.links.forum}
            className="heatpunk-card flex flex-col items-center gap-3 text-center hover:border-[var(--terminal-color)] hover:shadow-[0_0_20px_rgba(0,255,65,0.15)]"
          >
            <span className="text-2xl text-[var(--terminal-color)] font-mono">&gt;_</span>
            <span className="font-mono text-xs tracking-wider text-[var(--foreground)]">FORUM</span>
            <span className="font-mono text-[10px] text-[var(--muted)]">forum.heatpunks.org</span>
          </a>

          {/* Telegram */}
          <a
            href={siteConfig.links.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="heatpunk-card flex flex-col items-center gap-3 text-center hover:border-[var(--terminal-color)] hover:shadow-[0_0_20px_rgba(0,255,65,0.15)]"
          >
            <span className="text-2xl text-[var(--terminal-color)]">✈</span>
            <span className="font-mono text-xs tracking-wider text-[var(--foreground)]">TELEGRAM</span>
            <span className="font-mono text-[10px] text-[var(--muted)]">t.me/heatpunks</span>
          </a>

          {/* X / Twitter */}
          <a
            href={siteConfig.links.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="heatpunk-card flex flex-col items-center gap-3 text-center hover:border-[var(--terminal-color)] hover:shadow-[0_0_20px_rgba(0,255,65,0.15)]"
          >
            <span className="text-2xl text-[var(--terminal-color)]">𝕏</span>
            <span className="font-mono text-xs tracking-wider text-[var(--foreground)]">X / TWITTER</span>
            <span className="font-mono text-[10px] text-[var(--muted)]">@HashHeatpunks</span>
          </a>

          {/* Nostr */}
          <a
            href={siteConfig.links.nostr}
            target="_blank"
            rel="noopener noreferrer"
            className="heatpunk-card flex flex-col items-center gap-3 text-center hover:border-[var(--terminal-color)] hover:shadow-[0_0_20px_rgba(0,255,65,0.15)]"
          >
            <span className="text-2xl text-[var(--terminal-color)] font-mono">N</span>
            <span className="font-mono text-xs tracking-wider text-[var(--foreground)]">NOSTR</span>
            <span className="font-mono text-[10px] text-[var(--muted)]">npub1mc88...xfcy</span>
          </a>
        </div>

        {/* 256 Foundation Attribution */}
        <div className="mt-12 pt-8 border-t border-[var(--card-border)]">
          <p className="font-mono text-xs text-[var(--muted)]">
            <span className="text-[var(--accent)]">&gt;</span> A project of the{' '}
            <a
              href={siteConfig.foundation.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--terminal-color)] hover:text-[var(--accent)] transition-colors"
            >
              256 Foundation
            </a>
            {' '}— {siteConfig.foundation.mission}
          </p>
        </div>
      </div>
    </section>
  );
}
