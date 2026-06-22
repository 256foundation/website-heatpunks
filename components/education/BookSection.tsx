import Image from 'next/image';

export function BookSection() {
  return (
    <section className="py-16 md:py-24 bg-[var(--dark)] border-t border-[var(--gray)]">
      <div className="section-container">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Book Cover */}
            <div className="relative aspect-[3/4] max-w-sm mx-auto md:mx-0">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--flame)]/20 to-transparent rounded-sm" />
              <Image
                src="/images/book-cover.png"
                alt="Bitcoin Mining Heat Reuse - Book Cover"
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Book Info */}
            <div>
              <span className="section-tag">[001] FREE RESOURCE</span>

              <h2 className="font-mono text-2xl md:text-3xl font-bold tracking-wide mt-2 mb-2">
                BITCOIN MINING HEAT REUSE
              </h2>

              <p className="font-mono text-sm text-[var(--flame)] mb-4">
                {'// HEAT IS A PRODUCT, NOT A PROBLEM'}
              </p>

              <p className="text-[var(--muted)] text-xs font-mono mb-2">
                BY <span className="text-[var(--foreground)]">TYLER STEVENS</span>
              </p>

              <p className="text-[var(--gray-light)] mb-8 leading-relaxed text-sm">
                A comprehensive guide to understanding and implementing hashrate heating solutions.
                Learn how Bitcoin mining can be integrated into heating systems for homes,
                businesses, and industrial applications.
              </p>

              <a
                href="https://www.amazon.com/dp/B0GYJ8QDK6"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary group"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <BookIcon className="h-4 w-4" />
                  GET THE BOOK
                </span>
                <span className="btn-heat" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}
