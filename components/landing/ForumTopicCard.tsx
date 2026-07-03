import type { ForumTopic } from '@/types/discourse';

interface ForumTopicCardProps {
  topic: ForumTopic;
}

export function ForumTopicCard({ topic }: ForumTopicCardProps) {
  return (
    <a
      href={topic.url}
      className="block p-4 bg-[var(--card-background)] border border-[var(--card-border)] hover:border-[var(--accent)] transition-all group"
    >
      <h3 className="font-mono text-sm font-medium text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors mb-2 line-clamp-2">
        {topic.title}
      </h3>

      {topic.excerpt && (
        <p className="text-xs text-[var(--muted)] mb-3 line-clamp-2 leading-relaxed">
          {topic.excerpt}
        </p>
      )}

      <div className="flex items-center justify-between gap-2 text-[10px] font-mono">
        <span className="heatpunk-tag truncate max-w-[70%]">
          {topic.category.toUpperCase()}
        </span>
        <span className="text-[var(--muted)] whitespace-nowrap flex-shrink-0">{topic.timeAgo}</span>
      </div>
    </a>
  );
}
