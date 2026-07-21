'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Video } from '@/data/videos';

interface TalkGridProps {
  videos: Video[];
}

export function TalkGrid({ videos }: TalkGridProps) {
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);

  return (
    <div className="space-y-6">
      {/* Inline player (loads a single iframe on demand) */}
      {activeVideo && (
        <div className="relative aspect-video border border-[var(--card-border)] bg-black">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?autoplay=1`}
            title={activeVideo.title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
          <button
            onClick={() => setActiveVideo(null)}
            className="absolute right-3 top-3 border border-[var(--card-border)] bg-black/80 p-2 font-mono text-xs text-white transition-colors hover:bg-[var(--terminal-color)]"
            aria-label="Close video"
          >
            ✕
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => (
          <button
            key={video.id}
            onClick={() => setActiveVideo(video)}
            className="group relative aspect-video overflow-hidden border border-[var(--card-border)] bg-[var(--card-background)] text-left transition-colors hover:border-[var(--terminal-color)]"
          >
            <Image
              src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
              alt={video.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover opacity-80 transition-all duration-300 group-hover:scale-105 group-hover:opacity-100"
            />
            {/* Play overlay — dark for contrast over the thumbnail */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 transition-colors group-hover:bg-black/30">
              <div className="flex h-12 w-12 items-center justify-center border-2 border-[var(--terminal-color)] transition-colors group-hover:bg-[var(--terminal-color)]">
                <PlayIcon className="h-5 w-5 text-[var(--terminal-color)] group-hover:text-black" />
              </div>
            </div>
            {/* Title — dark gradient for readability over the thumbnail */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
              <p className="line-clamp-2 font-mono text-xs text-white">{video.title}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}
