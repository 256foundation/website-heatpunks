import { siteConfig } from '@/data/site';

export function HeroSection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Flame background - uses theme-aware CSS class */}
      <div className="absolute inset-0 flame-bg" />
      <div className="noise-overlay" />

      <div className="relative z-10 section-container text-center">
        <span className="section-tag">[GRANTS]</span>
        <h1 className="font-mono text-[clamp(2rem,8vw,4rem)] font-extrabold tracking-tight mb-4">
          <span className="text-flame-gradient">BUILDING</span>{' '}
          <span className="text-[var(--foreground)]">THE INDUSTRY</span>
        </h1>
        <p className="text-[var(--muted)] max-w-2xl mx-auto leading-relaxed mb-8">
          The Hashrate Heatpunk Grant Program funds community projects advancing hashrate heating adoption
          globally - technical standards, research, advocacy, documentation, and education.
          {siteConfig.grants.open ? (
            <>
              {' '}If it decentralizes mining &amp; moves the industry forward, we want to hear about it.
            </>
          ) : (
            <>
              {' '}<span className="text-[var(--foreground)]">The program is currently paused while we raise
              dedicated funding.</span> Grant cycles run intermittently - we&apos;ll reopen applications once new
              funding is secured. The most direct way to bring grants back is to donate.
            </>
          )}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          {siteConfig.grants.open ? (
            <>
              <a href="#apply" className="btn-primary inline-flex">
                <span className="relative z-10">APPLY NOW</span>
                <span className="btn-heat" />
              </a>
              <a
                href={siteConfig.foundation.donate}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                DONATE VIA THE 256 FOUNDATION
              </a>
            </>
          ) : (
            <>
              <a
                href={siteConfig.foundation.donate}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex"
              >
                <span className="relative z-10">DONATE TO FUND GRANTS ↗</span>
                <span className="btn-heat" />
              </a>
              <a href="#apply" className="btn-outline">
                PROGRAM STATUS
              </a>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
