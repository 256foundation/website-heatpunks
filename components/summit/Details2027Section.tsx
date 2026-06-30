export function Details2027Section() {
  return (
    <section className="py-16 md:py-24 bg-[var(--background)] border-t border-[var(--card-border)]">
      <div className="section-container">
        <div className="mb-12">
          <span className="section-tag">[004]</span>
          <h2 className="font-mono text-2xl md:text-3xl font-bold tracking-wide mt-2">
            EVENT <span className="text-[var(--accent)]">DETAILS</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl">
          <div className="space-y-6">
            <DetailBlock label="DATE" value="February 26–27, 2027" sub="Pre-summit ski day: Feb 25 (TBD)" />
            <DetailBlock label="TICKET" value="$350 USD" sub="Pay in fiat or bitcoin · Invite-only purchase link sent after waitlist review" />
            <DetailBlock label="STATUS" value="PLANNING" sub="Waitlist open — tickets not yet available" />
          </div>

          <div className="space-y-6">
            <div>
              <span className="font-mono text-[10px] tracking-widest text-[var(--muted)]">VENUE</span>
              <p className="font-mono text-sm font-bold text-[var(--foreground)] mt-1">The Space — RiNo, Denver</p>
              <p className="text-[var(--muted)] text-xs mt-1">3700 N Franklin St, Denver, CO 80205</p>
            </div>

            {/* Map embed */}
            <div className="border border-[var(--card-border)] overflow-hidden">
              <iframe
                title="The Space - Summit Venue"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3068.2!2d-104.96816299173025!3d39.7683395586488!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x876c78f21456e5e7%3A0x4b7a4b7a4b7a4b7a!2s3700+N+Franklin+St%2C+Denver%2C+CO+80205!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="p-3 bg-[var(--card-background)] border border-[var(--card-border)] font-mono text-xs text-[var(--muted)] space-y-1">
              <p><span className="text-[var(--accent)]">AIRPORT:</span> Denver International (DEN) — ~40 min</p>
              <p><span className="text-[var(--accent)]">NEIGHBORHOOD:</span> RiNo Art District</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DetailBlock({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div>
      <span className="font-mono text-[10px] tracking-widest text-[var(--muted)]">{label}</span>
      <p className="font-mono text-base font-bold text-[var(--foreground)] mt-1">{value}</p>
      <p className="text-[var(--muted)] text-xs mt-1">{sub}</p>
    </div>
  );
}
