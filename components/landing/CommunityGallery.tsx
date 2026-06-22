import { siteConfig } from '@/data/site';
import { GalleryImageCard } from './GalleryImageCard';
import type { ForumImage } from '@/types/discourse';

interface CommunityGalleryProps {
  images?: ForumImage[] | null;
}

export function CommunityGallery({ images }: CommunityGalleryProps) {
  // Show fallback UI if no images available
  if (!images || images.length === 0) {
    return (
      <section className="py-16 md:py-24 bg-[var(--background-alt)] border-t border-[var(--card-border)]">
        <div className="section-container text-center">
          <span className="section-tag">[COMMUNITY]</span>
          <h2 className="font-mono text-2xl md:text-3xl font-bold tracking-wide mt-4">
            FROM THE <span className="text-[var(--accent)]">FORUM</span>
          </h2>
          <p className="text-[var(--muted)] mt-4 mb-6">
            Community images temporarily unavailable. Check back soon!
          </p>
          <a
            href={siteConfig.links.forum}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-block"
          >
            <span className="font-mono text-xs tracking-wider">VISIT FORUM DIRECTLY</span>
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-[var(--background-alt)] border-t border-[var(--card-border)] overflow-hidden">
      <div className="section-container">
        {/* Section header */}
        <div className="mb-8">
          <span className="section-tag">[COMMUNITY]</span>
          <h2 className="font-mono text-2xl md:text-3xl font-bold tracking-wide">
            FROM THE <span className="text-[var(--accent)]">FORUM</span>
          </h2>
          <p className="text-[var(--muted)] mt-2 text-sm">
            Real builds and projects from the Hashrate Heatpunks community.
          </p>
        </div>
      </div>

      {/* Scrollable gallery - full width */}
      <div className="relative">
        <div className="flex gap-4 overflow-x-auto pb-4 px-6 md:px-12 scrollbar-hide snap-x snap-mandatory">
          {images.map((image) => (
            <GalleryImageCard key={image.id} image={image} />
          ))}
        </div>

        {/* Fade edges */}
        <div className="absolute top-0 left-0 bottom-4 w-6 md:w-12 bg-gradient-to-r from-[var(--background-alt)] to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-4 w-6 md:w-12 bg-gradient-to-l from-[var(--background-alt)] to-transparent pointer-events-none" />
      </div>

      {/* View all link */}
      <div className="section-container mt-6">
        <a
          href={siteConfig.links.forum}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-mono text-xs tracking-wider text-[var(--accent)] hover:text-[var(--accent-light)] transition-colors"
        >
          <span>&gt;</span>
          SEE BUILDS ON THE FORUM
          <span>→</span>
        </a>
      </div>
    </section>
  );
}
