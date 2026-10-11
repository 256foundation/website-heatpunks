'use client';

import { useState } from 'react';
import type { Session, Summit, Person } from '@/types/schedule';
import { formatTime } from '@/lib/utils';

// Helper function to format a person (name with affiliation)
function formatPerson(person: Person | string): string {
  if (typeof person === 'string') return person;
  return person.affiliation ? `${person.name} (${person.affiliation})` : person.name;
}

// Helper function to format a list of people
function formatPeople(people: Person[] | string[] | undefined): string {
  if (!people || people.length === 0) return '';
  return people.map(formatPerson).join(', ');
}

interface SessionCardProps {
  session: Session;
  date: string;
  summit: Summit;
}

const sessionTypeStyles: Record<string, string> = {
  talk: 'bg-[var(--flame)]/20 text-[var(--flame)] border-[var(--flame)]/30',
  workshop: 'bg-[var(--terminal)]/20 text-[var(--terminal)] border-[var(--terminal)]/30',
  panel: 'bg-[var(--bitcoin)]/20 text-[var(--bitcoin)] border-[var(--bitcoin)]/30',
  demo: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  break: 'bg-[var(--gray)]/20 text-[var(--gray-light)] border-[var(--gray)]/30',
  social: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  keynote: 'bg-[var(--flame)]/30 text-[var(--flame)] border-[var(--flame)]/50',
};

export function SessionCard({ session, date, summit }: SessionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasExpandableContent = session.description || session.moderator || (session.speakers && session.speakers.length > 0);
  const typeStyle = sessionTypeStyles[session.type] || sessionTypeStyles.talk;

  return (
    <div
      className={`border border-[var(--card-border)] bg-[var(--card-background)] overflow-hidden transition-all ${
        isExpanded ? 'border-l-2 border-l-[var(--accent)]' : ''
      }`}
    >
      <div
        className={`px-4 py-3 ${
          hasExpandableContent ? 'cursor-pointer hover:bg-[var(--background)]' : ''
        } transition-colors`}
        onClick={() => hasExpandableContent && setIsExpanded(!isExpanded)}
        role={hasExpandableContent ? 'button' : undefined}
        aria-expanded={hasExpandableContent ? isExpanded : undefined}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            {/* Time */}
            <div className="font-mono text-[10px] text-[var(--accent)] mb-1">
              {formatTime(session.start)} - {formatTime(session.end)}
            </div>

            {/* Title */}
            <h3 className="font-mono text-sm text-[var(--foreground)] mb-2">
              {session.title}
            </h3>

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Session type badge */}
              <span className={`px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider border ${typeStyle}`}>
                {session.type}
              </span>

              {/* Public badge */}
              {session.isPublic && (
                <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider border bg-[var(--terminal-color)]/20 text-[var(--terminal-color)] border-[var(--terminal-color)]/30">
                  PUBLIC
                </span>
              )}

              {/* Location */}
              {session.location && (
                <span className="font-mono text-[10px] text-[var(--muted)] flex items-center gap-1">
                  <LocationIcon className="h-3 w-3" />
                  {session.location}
                </span>
              )}

              {/* Moderator (if exists) */}
              {session.moderator && (
                <span className="font-mono text-[10px] text-[var(--muted)]">
                  Moderator: {formatPerson(session.moderator)}
                </span>
              )}

              {/* Speakers */}
              {session.speakers && session.speakers.length > 0 && (
                <span className="font-mono text-[10px] text-[var(--terminal-color)]">
                  {formatPeople(session.speakers)}
                </span>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {hasExpandableContent && (
              <div className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                <ChevronDownIcon className="h-4 w-4 text-[var(--muted)]" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Expanded content */}
      {isExpanded && hasExpandableContent && (
        <div className="px-4 py-3 bg-[var(--background)] border-t border-[var(--card-border)]">
          {session.description && (
            <p className="text-[var(--muted)] text-sm leading-relaxed mb-3">
              {session.description}
            </p>
          )}
          {session.link && (
            <a
              href={session.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-xs tracking-wider text-[var(--accent)] hover:text-[var(--accent-light)] transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <span>&gt;</span>
              {session.link.includes('maps.app.goo.gl') || session.link.includes('google.com/maps') ? 'Google Maps' : 'RSVP'}
              <span>↗</span>
            </a>
          )}
        </div>
      )}
    </div>
  );
}

function LocationIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
