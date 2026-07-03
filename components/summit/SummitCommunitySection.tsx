import { siteConfig } from '@/data/site';

export function SummitCommunitySection() {
  return (
    <section className="py-16 md:py-24 bg-[var(--background)] border-t border-b border-[var(--card-border)]">
      <div className="section-container">
        {/* Section header */}
        <div className="text-center mb-8">
          <span className="section-tag">[007]</span>
          <h2 className="font-mono text-2xl md:text-3xl font-bold tracking-wide mt-2">
            JOIN THE <span className="text-[var(--accent)]">COMMUNITY</span>
          </h2>
          <p className="text-[var(--muted)] text-sm mt-2 max-w-md mx-auto">
            Connect with heatpunks worldwide. Share builds, ask questions, stay updated.
          </p>
        </div>

        {/* Community links */}
        <div className="flex flex-col md:flex-row gap-4 justify-center max-w-3xl mx-auto">
          {/* Forum */}
          <a
            href={siteConfig.links.forum}
            className="heatpunk-card flex flex-col items-center gap-2 text-center hover:border-[var(--terminal-color)] hover:shadow-[0_0_20px_rgba(0,255,65,0.15)] flex-1"
          >
            <span className="text-2xl text-[var(--terminal-color)] font-mono">&gt;_</span>
            <span className="font-mono text-xs tracking-wider text-[var(--foreground)]">FORUM</span>
            <span className="font-mono text-[10px] text-[var(--muted)]">forum.heatpunks.org</span>
          </a>

          {/* X / Twitter */}
          <a
            href={siteConfig.links.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="heatpunk-card flex flex-col items-center gap-2 text-center hover:border-[var(--terminal-color)] hover:shadow-[0_0_20px_rgba(0,255,65,0.15)] flex-1"
          >
            <span className="text-2xl text-[var(--terminal-color)]">𝕏</span>
            <span className="font-mono text-xs tracking-wider text-[var(--foreground)]">X / TWITTER</span>
            <span className="font-mono text-[10px] text-[var(--muted)]">@HashHeatpunks</span>
          </a>

          {/* Telegram */}
          <a
            href={siteConfig.links.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="heatpunk-card flex flex-col items-center gap-2 text-center hover:border-[var(--terminal-color)] hover:shadow-[0_0_20px_rgba(0,255,65,0.15)] flex-1"
          >
            <span className="text-2xl text-[var(--terminal-color)]">✈</span>
            <span className="font-mono text-xs tracking-wider text-[var(--foreground)]">TELEGRAM</span>
            <span className="font-mono text-[10px] text-[var(--muted)]">t.me/heatpunks</span>
          </a>

          {/* Nostr */}
          <a
            href={siteConfig.links.nostr}
            target="_blank"
            rel="noopener noreferrer"
            className="heatpunk-card flex flex-col items-center gap-2 text-center hover:border-[var(--terminal-color)] hover:shadow-[0_0_20px_rgba(0,255,65,0.15)] flex-1"
          >
            <span className="text-2xl text-[var(--terminal-color)] font-mono">N</span>
            <span className="font-mono text-xs tracking-wider text-[var(--foreground)]">NOSTR</span>
            <span className="font-mono text-[10px] text-[var(--muted)]">npub1mc88...xfcy</span>
          </a>
        </div>
      </div>
    </section>
  );
}
