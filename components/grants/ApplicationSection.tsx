import { GrantsForm } from './GrantsForm';
import { siteConfig } from '@/data/site';

export function ApplicationSection() {
  if (!siteConfig.grants.open) {
    return (
      <section id="apply" className="py-16 md:py-24 bg-[var(--background)]">
        <div className="section-container">
          <div className="mb-12">
            <span className="section-tag">[003]</span>
            <h2 className="font-mono text-2xl md:text-3xl font-bold tracking-wide mt-2 mb-4">
              APPLICATIONS <span className="text-[var(--accent)]">PAUSED</span>
            </h2>
          </div>

          <div className="max-w-3xl bg-[var(--card-background)] border border-[var(--card-border)] border-l-[3px] border-l-[var(--accent)] p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs tracking-wider text-[var(--terminal-color)]">
                &gt; STATUS
              </span>
              <span className="font-mono text-xs tracking-wider px-2 py-1 bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/30">
                NOT ACCEPTING APPLICATIONS
              </span>
            </div>
            <p className="text-[var(--muted)] leading-relaxed mb-4">
              We&apos;re not accepting new grant applications right now. The program is on hold while we
              focus on raising dedicated funding so we can fund the work this industry needs. Grant cycles
              run intermittently - the moment we secure new funding, we&apos;ll reopen applications and
              announce the next cycle.
            </p>
            <p className="text-[var(--muted)] leading-relaxed mb-6">
              You can help bring grants back sooner. Every donation to the 256 Foundation goes directly
              toward funding builders, researchers, and educators advancing hashrate heating.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={siteConfig.foundation.donate}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex"
              >
                <span className="relative z-10">DONATE TO FUND GRANTS ↗</span>
                <span className="btn-heat" />
              </a>
              <a
                href={siteConfig.links.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                GET NOTIFIED IN THE GROUP CHAT ↗
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="apply" className="py-16 md:py-24 bg-[var(--background)]">
      <div className="section-container">
        <div className="mb-12">
          <span className="section-tag">[003]</span>
          <h2 className="font-mono text-2xl md:text-3xl font-bold tracking-wide mt-2 mb-4">
            SUBMIT YOUR <span className="text-[var(--accent)]">PROPOSAL</span>
          </h2>
          <p className="text-[var(--muted)] max-w-2xl">
            Tell us about your project. We review applications on a rolling basis and
            will reach out if we&apos;d like to learn more.
          </p>
        </div>

        <div className="max-w-3xl">
          <GrantsForm />
        </div>
      </div>
    </section>
  );
}
