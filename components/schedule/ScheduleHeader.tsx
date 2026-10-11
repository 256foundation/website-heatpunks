'use client';

import type { Summit } from '@/types/schedule';

interface ScheduleHeaderProps {
  summit: Summit;
}

export function ScheduleHeader({ summit }: ScheduleHeaderProps) {
  return (
    <div className="mb-12">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
        <div>
          <span className="section-tag">[SCHEDULE]</span>
          <h1 className="font-mono text-3xl md:text-4xl font-bold tracking-wide mt-2 mb-3">
            SUMMIT <span className="text-[var(--accent)]">SCHEDULE</span>
          </h1>
          <p className="font-mono text-xs text-[var(--muted)]">
            <span className="text-[var(--terminal-color)]">&gt;</span> February 26-28, {summit.year} • {summit.venue.name}
          </p>
          <p className="font-mono text-xs text-[var(--muted)] mt-1">
            [ARCHIVE] Schedule as published for the {summit.year} summit.
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="mt-8 border-t border-[var(--card-border)]" />
    </div>
  );
}
