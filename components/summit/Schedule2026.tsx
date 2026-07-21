'use client';

import { useState } from 'react';
import type { ScheduleData, Session } from '@/types/schedule';
import { formatTime } from '@/lib/scheduleUtils';

interface Schedule2026Props {
  scheduleData: ScheduleData;
}

function speakerNames(session: Session): string | null {
  if (!session.speakers || session.speakers.length === 0) return null;
  return session.speakers
    .map((s) => (typeof s === 'string' ? s : s.name))
    .join(', ');
}

export function Schedule2026({ scheduleData }: Schedule2026Props) {
  const [activeDay, setActiveDay] = useState(0);
  const day = scheduleData.days[activeDay];

  return (
    <section id="schedule" className="border-t border-[var(--card-border)] bg-[var(--background)] py-16 md:py-24">
      <div className="section-container">
        <div className="mb-8">
          <span className="section-tag">[005]</span>
          <h2 className="mt-2 font-mono text-2xl font-bold tracking-wide md:text-3xl">
            FULL <span className="text-[var(--heatpunk-yellow-color)]">SCHEDULE</span>
          </h2>
        </div>

        {/* Day tabs */}
        <div className="mb-8 flex flex-wrap gap-2">
          {scheduleData.days.map((d, i) => (
            <button
              key={d.date}
              onClick={() => setActiveDay(i)}
              className={`border px-4 py-2 font-mono text-xs tracking-wider transition-colors ${
                i === activeDay
                  ? 'border-[var(--heatpunk-yellow-color)] text-[var(--heatpunk-yellow-color)]'
                  : 'border-[var(--card-border)] text-[var(--muted)] hover:border-[var(--heatpunk-yellow-color)]'
              }`}
            >
              {d.name}
            </button>
          ))}
        </div>

        {/* Sessions */}
        <div className="mx-auto max-w-3xl space-y-2">
          {day.sessions.map((session) => (
            <div
              key={session.id}
              className="flex gap-4 border-b border-[var(--card-border)] py-3 text-sm"
            >
              <div className="w-20 flex-shrink-0 font-mono text-xs text-[var(--muted)]">
                {formatTime(session.start)}
              </div>
              <div className="flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--heatpunk-yellow-color)]">
                    {session.type}
                  </span>
                  <p className="font-medium text-[var(--foreground)]">{session.title}</p>
                </div>
                {speakerNames(session) && (
                  <p className="mt-0.5 text-xs text-[var(--muted)]">{speakerNames(session)}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
