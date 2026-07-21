import type { CSSProperties } from 'react';
import { VideoEmbed } from '@/components/shared/VideoEmbed';
import { TalkGrid } from './TalkGrid';
import { summit2026Videos } from '@/data/videos';

const PLAYLIST_URL =
  'https://www.youtube.com/watch?v=4FEwVYIvvSU&list=PLgYVdSZznAdM7JVqScdZcKJ5i4ILABNC4';

export function SummitVideoSection() {
  // Recap + keynote + talks + award announcement — workshop videos live in the
  // workshops section instead, so they aren't duplicated here.
  const talkVideos = summit2026Videos.filter((video) => !video.id.startsWith('hps26-workshop'));
  const recapVideo = talkVideos[0];
  const gridVideos = talkVideos.slice(1);

  return (
    <section id="recap" className="border-t border-[var(--card-border)] bg-[var(--card-background)] py-16 md:py-24">
      <div className="section-container">
        {/* Section header */}
        <div className="mb-8">
          <span className="section-tag">[003]</span>
          <h2 className="mt-2 font-mono text-2xl font-bold tracking-wide md:text-3xl">
            SUMMIT <span className="text-[var(--heatpunk-yellow-color)]">RECAP</span>
          </h2>
        </div>

        {/* Featured recap video */}
        <div className="mx-auto mb-12 max-w-4xl">
          <div className="border border-[var(--card-border)]">
            <VideoEmbed youtubeId={recapVideo.youtubeId} title={recapVideo.title} />
          </div>
        </div>

        {/* Talk grid, retinted to the 2026 yellow signature */}
        <div
          className="mx-auto max-w-5xl"
          style={{ '--terminal-color': 'var(--heatpunk-yellow-color)' } as CSSProperties}
        >
          <div className="mb-6 flex items-center justify-between">
            <h3 className="font-mono text-xs tracking-wider text-[var(--heatpunk-yellow-color)]">
              &gt; ALL TALKS ({gridVideos.length})
            </h3>
            <a
              href={PLAYLIST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] text-[var(--heatpunk-yellow-color)] hover:underline"
            >
              VIEW FULL PLAYLIST ↗
            </a>
          </div>
          <TalkGrid videos={gridVideos} />
        </div>
      </div>
    </section>
  );
}
