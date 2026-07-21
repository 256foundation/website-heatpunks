import { siteConfig } from '@/data/site';

const activities = [
  {
    tag: 'TALKS',
    title: 'State of the Stack',
    body: 'Where the open-source mining stack stands, real build data, case studies, and the policy and regulatory picture. Real numbers and real builds — not pitch decks.',
    icon: '▶',
    color: 'var(--accent)',
  },
  {
    tag: 'WORKSHOPS',
    title: 'Build on the 256 Stack',
    body: 'The 2027 focus: hands-on sessions on actually using the 256 Foundation open-source stack — firmware, reference designs, pool setup — plus collaborative work on the problems that are still hard.',
    icon: '⚙',
    color: 'var(--terminal-color)',
  },
  {
    tag: 'DEMOS',
    title: 'Live Hardware on the Floor',
    body: 'Real mining systems repurposed for heat, custom control boards, firmware running on live hardware. If you built it, bring it. The demo floor is where ideas become credible.',
    icon: '⚡',
    color: 'var(--flame)',
  },
  {
    tag: 'NETWORKING',
    title: 'The Room Itself',
    body: 'Mining developers, HVAC and building pros, firmware hackers, and policy people in one place. Meals and the after-party are included — and the optional Feb 25 ski day is where a lot of it happens.',
    icon: '◈',
    color: 'var(--muted)',
  },
];

export function WhatToExpectSection() {
  return (
    <section className="py-16 md:py-24 bg-[var(--card-background)] border-t border-[var(--card-border)]">
      <div className="section-container">
        <div className="mb-12">
          <span className="section-tag">[003]</span>
          <h2 className="font-mono text-2xl md:text-3xl font-bold tracking-wide mt-2">
            WHAT TO <span className="text-[var(--accent)]">EXPECT</span>
          </h2>
          <p className="text-[var(--muted)] text-sm mt-3 max-w-xl">
            Two days of focused programming at The Space in Denver — tuned this year for building on
            the open-source stack.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {activities.map((activity) => (
            <div key={activity.tag} className="heatpunk-card flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="text-xl" style={{ color: activity.color }}>{activity.icon}</span>
                <span
                  className="font-mono text-[10px] tracking-widest border px-2 py-0.5"
                  style={{ color: activity.color, borderColor: activity.color + '40' }}
                >
                  {activity.tag}
                </span>
              </div>
              <h3 className="font-mono text-sm font-bold tracking-wide text-[var(--foreground)]">
                {activity.title}
              </h3>
              <p className="text-[var(--muted)] text-sm leading-relaxed flex-1">
                {activity.body}
              </p>
            </div>
          ))}
        </div>

        {/* Agenda note */}
        <div className="mt-8 p-4 bg-[var(--background)] border border-[var(--card-border)] font-mono text-xs text-[var(--muted)]">
          <span className="text-[var(--terminal-color)]">NOTE_</span> Full agenda and speaker lineup
          announced closer to the event. Join the waitlist to stay informed.
        </div>

        {/* Call for content */}
        <div className="mt-4 p-5 border border-[var(--accent)]/40 bg-[var(--background)]">
          <h3 className="font-mono text-sm font-bold tracking-wide text-[var(--foreground)]">
            WANT TO DEMO, LEAD A WORKSHOP, OR GIVE A TALK?
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
            We&apos;re actively programming HPS 2027 and we prioritize live hardware and working
            builds over slides. If you&apos;ve built something or can lead a hands-on session, get in
            touch.
          </p>
          <a
            href={`mailto:${siteConfig.contact.email}?subject=HPS 2027 Demo / Talk / Workshop Proposal`}
            className="mt-4 inline-block btn-outline"
          >
            PITCH A SESSION ↗
          </a>
        </div>
      </div>
    </section>
  );
}
