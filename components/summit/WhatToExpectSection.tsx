const activities = [
  {
    tag: 'TALKS',
    title: 'Deep Dives & State of the Stack',
    body: 'Presentations covering firmware, hardware, system design, case studies, policy, and where the FOSS mining stack is headed. Expect real data and real builds — not pitch decks.',
    icon: '▶',
    color: 'var(--accent)',
  },
  {
    tag: 'WORKSHOPS',
    title: 'Hands-On Collaboration',
    body: 'Structured working sessions where builders and domain experts tackle specific problems together. Past workshops have covered hydronic integration, Home Assistant automations, firmware feedback, and building standards.',
    icon: '⚙',
    color: 'var(--terminal-color)',
  },
  {
    tag: 'DEMOS',
    title: 'Live Hardware on the Floor',
    body: 'Real mining systems repurposed for heating, space heating rigs, custom control boards, firmware running on live hardware. If you built it, bring it. The demo floor is where ideas become credible.',
    icon: '⚡',
    color: 'var(--flame)',
  },
  {
    tag: 'NETWORKING',
    title: 'Cross-Industry Connections',
    body: 'The rarest thing about this event: mining developers, pleb builders, HVAC engineers, building professionals, firmware hackers, and policy people in the same room. The hallway conversations matter as much as the formal program.',
    icon: '◈',
    color: 'var(--muted)',
  },
];

export function WhatToExpectSection() {
  return (
    <section className="py-16 md:py-24 bg-[var(--background)] border-t border-[var(--card-border)]">
      <div className="section-container">
        <div className="mb-12">
          <span className="section-tag">[003]</span>
          <h2 className="font-mono text-2xl md:text-3xl font-bold tracking-wide mt-2">
            WHAT TO <span className="text-[var(--accent)]">EXPECT</span>
          </h2>
          <p className="text-[var(--muted)] text-sm mt-3 max-w-xl">
            Two days of focused programming at The Space in Denver. Same format that&apos;s worked the last two years.
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

        <div className="mt-8 p-4 bg-[var(--card-background)] border border-[var(--card-border)] font-mono text-xs text-[var(--muted)]">
          <span className="text-[var(--terminal-color)]">NOTE_</span> A ski day on Feb 25th is being planned. Details TBD — keep an eye on the forum.
        </div>
      </div>
    </section>
  );
}
