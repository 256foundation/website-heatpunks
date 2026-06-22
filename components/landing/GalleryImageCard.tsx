'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { ForumImage } from '@/types/discourse';

interface GalleryImageCardProps {
  image: ForumImage;
}

/**
 * A single forum gallery thumbnail. If the image fails to load (forum slow,
 * source removed, optimizer error), the whole card removes itself rather than
 * leaving a broken-image box in the scroller.
 */
export function GalleryImageCard({ image }: GalleryImageCardProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return null;
  }

  return (
    <a
      href={image.topicUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex-shrink-0 group snap-start"
    >
      <div className="relative w-72 h-48 md:w-80 md:h-56 overflow-hidden border border-[var(--card-border)] bg-[var(--card-background)]">
        <Image
          src={image.url}
          alt={image.topicTitle}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 288px, 320px"
          onError={() => setFailed(true)}
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="font-mono text-xs text-white line-clamp-2">
              {image.topicTitle}
            </p>
            <span className="font-mono text-[10px] text-[var(--terminal-color)] mt-1 inline-block">
              VIEW ON FORUM →
            </span>
          </div>
        </div>
        {/* Border glow on hover */}
        <div className="absolute inset-0 border-2 border-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
    </a>
  );
}
