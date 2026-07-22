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
            <DetailBlock
              label="DATE"
              value="February 26–27, 2027"
              sub="Programming runs all day Friday the 26th and Saturday the 27th, with evening activities both nights."
            />
            <DetailBlock
              label="TRAVEL"
              value="Fly in Thu, leave Sun"
              sub="Want to ski Thursday? Fly in Wednesday instead — optional pre-summit ski day Feb 25, details to follow."
            />
            <DetailBlock
              label="TICKET"
              value="$350 USD"
              sub="Pay in fiat or bitcoin · includes meals, the after-party & all sessions · purchase link sent after waitlist review."
            />
            <DetailBlock
              label="STATUS"
              value="WAITLIST OPEN"
              sub="Tickets are invite-confirmed after we review your waitlist application."
            />
          </div>

          <div className="space-y-6">
            <div>
              <span className="font-mono text-[10px] tracking-widest text-[var(--muted)]">VENUE</span>
              <p className="font-mono text-sm font-bold text-[var(--foreground)] mt-1">The Space — RiNo, Denver</p>
              <p className="text-[var(--muted)] text-xs mt-1">3700 N Franklin St, Denver, CO 80205</p>
            </div>

            {/* Map embed — keyless coordinate pin */}
            <div className="border border-[var(--card-border)] overflow-hidden">
              <iframe
                title="The Space — Summit Venue"
                src="https://www.google.com/maps?q=39.7683395586488,-104.96816299173025&z=15&output=embed"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="p-3 bg-[var(--card-background)] border border-[var(--card-border)] font-mono text-xs text-[var(--muted)] space-y-1">
              <p>
                <span className="text-[var(--accent)]">AIRPORT:</span> DEN — RTD A Line → 38th &amp;
                Blake (~7-min walk)
              </p>
              <p>
                <span className="text-[var(--accent)]">LODGING:</span> Catbird Hotel (~4-min walk),
                or anywhere in RiNo / downtown
              </p>
              <p>
                <span className="text-[var(--accent)]">NEIGHBORHOOD:</span> RiNo Art District
              </p>
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
