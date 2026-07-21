# HPS 2027 Summit Page — Overhaul Spec

**Status: current — approved via spec interview, 2026-07-21.**
Supersedes the 2027-page portions of [SPEC-summit-2027.md](SPEC-summit-2027.md) (that doc remains the historical build spec for the 2025/2026 archives and initial 2027 build). Where the two conflict for `/summit`, **this document wins.**

**Purpose:** Overhaul the `/summit` (Heatpunk Summit 2027) page. It currently reads as a flat homepage clone with thin, generic sections, scrambled section numbering, and a broken venue map. This spec rebuilds it around the **ACCELERATE** narrative with the visual polish of the freshly-overhauled `/summit/2026` archive.

**Scope:** `/summit` page + its section components + `data/summit2027.ts` copy + a small sitewide audit. **No** changes to `/summit/2026`, `/summit/2025`, API routes, the waitlist backend, or the global design system.

---

## 1. Design Constraints

- **No 2027 branding package.** Use the existing site aesthetic only: flame/terminal look via `flame-bg`, `noise-overlay`, `scan-lines`, `text-flame-gradient`, `--accent` (flame), `--terminal-color`, `--flame`, mono type, `heatpunk-card`, `section-tag`, `btn-primary`/`btn-secondary`/`btn-outline`, `text-highlight`, `heatpunk-tag`. **No photographs** (unlike the 2026 archive, which uses a thermal photo as its own branding).
- **Quality bar = `/summit/2026`.** Match its editorial richness: highlight spans, tag chips, multi-column layouts, varied section backgrounds (`--background` / `--card-background` alternating), real hierarchy. Avoid the current "every section is one monotone text-card grid" monotony.
- **Theme-aware.** All colors via CSS variables so light/dark both work (site is dark-default).

---

## 2. Narrative & Messaging

### 2.1 The three-year arc (canonical)

| Year | Label | Story |
|---|---|---|
| 2025 | **THE SPARK** | First time this community was ever in one room — mining devs, pleb builders, tinkerers, firmware hackers, heating/building experts. ~150 people. Takeaway: *we need to get organized.* Led directly to heatpunks.org and the forum. |
| 2026 | **THE FOUNDATION** | The movement formalized. Hashrate Heatpunks became a formal community project of the **256 Foundation** (501(c)(3)); summit host Tyler Stevens named president of its board. First **Heatpunk Innovation Award**. First **collaborative workshops** solving problems together. More polished demos; ASHRAE/DOE professionals on the floor. |
| 2027 | **ACCELERATE** | **No more barriers.** The historic blocker was always closed mining firmware. Now the 256 Foundation has released the open-source mining stack to the wild — **firmware, hashboard reference designs, control board reference designs, and mining pool implementations** — and heatpunks are already using it in builds. Combined with modern AI coding tools, *the barriers to building are gone.* So: **what will you build?** Secondary theme: **reports, data, documentation** — case studies, research papers, policy briefs, and playbooks are now public. What does the data show? What's still missing for residential, commercial, and regulatory adoption? |

The arc must **end on 2027/ACCELERATE** and set up the "Barriers Are Gone" centerpiece.

### 2.2 Confirmed facts (all public-ready)

- **Dates:** Summit **February 26–27, 2027**; optional pre-summit **ski day February 25, 2027**. All confirmed — drop all "PLANNING / TBD" hedging on *dates* (ski-day *logistics* stay light; see §5.4/§5.9).
- **Venue:** **The Space**, 3700 N Franklin St, Denver, CO 80205 — RiNo Art District. `coordinates: { lat: 39.7683395586488, lng: -104.96816299173025 }`.
- **Ticket:** **$350 USD**, payable in **fiat or bitcoin**. Waitlist-gated: purchase link sent only after review. Ticket **includes meals during the summit, the after-party, and full access to all sessions, workshops, and the demo floor**. (Ski day and travel/lodging are not included.)
- **Travel:** RTD **A Line** train from Denver International Airport → **38th & Blake** station (~7-min walk to the venue). Recommended lodging: **Catbird Hotel** (~4-min walk from venue; ~3-min from the train stop — right in between). General guidance otherwise: stay in RiNo / downtown Denver.
- **Contact:** All sponsor/demo/proposal mail → **admin@heatpunks.org** (use `siteConfig.contact.email`, which already equals this — single source of truth; stop hardcoding the literal string in some components and the config in others).

---

## 3. Section Structure (renumbered, order locked)

The current page has scrambled/duplicate `section-tag`s (`[002] [003] [004] [007] [005] [006] [008]` plus a second `[007]` on Community). **Renumber sequentially.** Hero carries no tag (matches `/summit/2026`, where the first real section is `[001]`). Manifesto is a decorative band with no tag.

| # | Section | Component | `section-tag` | Background |
|---|---|---|---|---|
| — | Hero (event-poster card) | `Summit2027Hero` | — | flame-bg |
| 1 | Why Attend — 3-year arc | `WhyAttendSection` | `[001]` | `--card-background` |
| 2 | The Barriers Are Gone (centerpiece) | `BarriersSection` (**new**) | `[002]` | `--background` |
| 3 | What to Expect (+ call for content) | `WhatToExpectSection` | `[003]` | `--card-background` |
| 4 | Event Details (fixed map) | `Details2027Section` | `[004]` | `--background` |
| 5 | Join the Waitlist | `RegistrationSection` | `[005]` | gradient band |
| 6 | Sponsorship (CTA + past strip) | `SponsorshipSection` | `[006]` | `--card-background` |
| 7 | Past Summits archive | `PastSummitsSection` | `[007]` | `--background` |
| 8 | FAQ | `FAQSection` | `[008]` | `--background` |
| — | Manifesto (evergreen band) | `ManifestoSection` | — | `--background` |
| 9 | Community links | `SummitCommunitySection` | `[009]` (pass `sectionTag="[009]"`) | `--background` |

`app/summit/page.tsx` imports/renders in this exact order.

---

## 4. Data File — `data/summit2027.ts`

Update the copy block (structure/types unchanged). The `summit2027Info.tagline`/`theme` are stale ("The proof is in the pudding").

```ts
export const summit2027Info = {
  theme: 'ACCELERATE',
  tagline: 'No more barriers. What will you build?',
  themeBlurb:
    'The open-source mining stack is here. Firmware, hashboard and control-board reference designs, and pool implementations are all open now — the historic barrier to building is gone. Year three is about acceleration: polish, possibility, and what comes next.',
  ticket: {
    price: 350,
    currency: 'USD',
    paymentOptions: ['fiat', 'bitcoin'] as const,
    includes: ['Meals during the summit', 'After-party', 'All talks, workshops & demos'],
    note: 'Tickets are $350. Pay in fiat or bitcoin when your spot is confirmed.',
  },
  sponsorEmail: 'admin@heatpunks.org', // prefer siteConfig.contact.email at call sites
};
```

Keep `summit2027` and `summit2027Venue` (dates/venue) as-is — they're already correct.

---

## 5. Section Specs

### 5.1 Hero — `Summit2027Hero` (client)

**Treatment:** an **event-poster card** — a bordered panel (`border border-[var(--card-border)]`, subtle inner padding, sits on the flame background) that reads like a summit poster/ticket. Keep `flame-bg` + `noise-overlay` + `scan-lines` behind it. This is what differentiates it from the identically-styled homepage hero.

Poster panel contents, top → bottom:
- **Eyebrow (terminal):** `// ACCELERATE` in `--terminal-color`.
- **Wordmark:** `HEATPUNK SUMMIT` (mono, extrabold) with a large **`2027`** treatment (`text-flame-gradient animate-text-glow`). May keep a skewed/oversized `2027` for poster feel.
- **Date/location line:** `FEB 26–27, 2027 · DENVER, CO` (prominent, not buried in a meta row).
- **Ticket line:** `$350 · PAY IN FIAT OR BITCOIN`.
- **Status chip:** `WAITLIST OPEN` (replaces blinking `PLANNING`; may keep `animate-blink` on a small dot/label).
- **CTAs:** primary `JOIN THE WAITLIST` (opens `WaitlistModal`, `year={2027}`); secondary `SPONSOR / DEMO INQUIRY` → `mailto:${siteConfig.contact.email}?subject=HPS 2027 Sponsorship`.
- Keep the `SCROLL` cue.

**Stat bar** (band directly below hero, unchanged structure): `3RD ANNUAL` · `150+ AT HPS26` · `$350 TICKET` · `FEB 26–27` · `THE SPACE, DENVER`.

Remove the `// UNDERMINING THE STATUS QUO` line and the old scattered `DATE/LOC/TICKET/STATUS` meta row (folded into the poster above).

### 5.2 Why Attend — `WhyAttendSection` `[001]`

Three cards = the §2.1 arc, each: big year (colored — 2025 `--terminal-color`, 2026 `--accent`, 2027 `--flame`), label chip (`THE SPARK` / `THE FOUNDATION` / `ACCELERATE`), headline, body. Content per §2.1. 2027 card ends pointing forward ("…so what will you build? — see below"), leading into the centerpiece. Intro line: *"Three years. Three chapters. Each summit built on the last."*

### 5.3 The Barriers Are Gone — `BarriersSection` `[002]` (NEW, centerpiece)

The visual and narrative anchor of the page. Two-part section on `--background`.

**Part A — the stack is open ("no more barriers"):**
- Header: `THE BARRIERS ARE **GONE**` (accent the last word).
- Lead: closed mining firmware was always *the* barrier. It's gone. Frame with a `text-highlight` on the key line.
- A grid of the now-open building blocks (cards or a checklist with a `>` / `✓` terminal motif), each linking to a 256 Foundation resource:
  - **Open-source firmware** → `https://github.com/256foundation`
  - **Hashboard reference designs** → `https://github.com/256foundation`
  - **Control board reference designs** → `https://github.com/256foundation`
  - **Mining pool implementations** → `https://github.com/256foundation`
  - (Also note **AI coding tools** as an accelerant — no link.)
  - Links open in a new tab (`target="_blank" rel="noopener noreferrer"`). Use `siteConfig.foundation.github` / `siteConfig.foundation.url` where available; general 256foundation.org links are acceptable — exact per-repo URLs can be refined later.
- Kicker: **"So what will you build?"** (large, `--flame`).

**Part B — data & documentation (folded in):**
- Sub-header within the same section, e.g. `AND THE DATA IS PUBLIC`.
- Copy: case studies, research papers, policy briefs, and playbooks are now public. Prompt the open questions: *What does the data show? What's still missing for residential, commercial, and regulatory adoption?*
- This frames a reason to attend for building-science / policy / commercial attendees, not just miners.

No form/CTA required here (the "what will you build?" energy is carried into What to Expect's call and the waitlist).

### 5.4 What to Expect — `WhatToExpectSection` `[003]`

Rework for the 2027 focus (not generic activity types). Four cards:
- **TALKS** — State of the open-source mining stack, case studies, real build data, policy/regulatory briefs. Real data and real builds, not pitch decks.
- **WORKSHOPS** — 2027 emphasis: **hands-on sessions on how to use and build with the 256 Foundation open-source stack** (firmware flashing/integration, reference designs, pool setup), plus collaborative problem-solving on what's still hard.
- **DEMOS** — Live hashrate-heating systems on the floor. *If you built it, bring it.*
- **NETWORKING** — Cross-industry room (mining devs + HVAC/building pros + policy). Includes **meals and the after-party**, plus the optional Feb 25 ski day.

Keep unicode/mono icon motif, per-card accent colors. Two notes at the bottom:
1. **Full agenda & speaker lineup announced closer to the event. Join the waitlist to stay informed.**
2. **Call for content (per interview):** *"Want to demo a build, lead a workshop, or give a talk? We're actively programming HPS 2027 — "* + link `mailto:${siteConfig.contact.email}?subject=HPS 2027 Demo / Talk / Workshop Proposal`. We prioritize live hardware and working builds over slides.

### 5.5 Event Details — `Details2027Section` `[004]`

Two-column. Left = detail blocks; right = venue + **fixed** map + getting-there.
- **DATE:** February 26–27, 2027 · sub: *Optional pre-summit ski day Feb 25 — details to follow, check back.*
- **TICKET:** $350 USD · sub: *Pay in fiat or bitcoin · includes meals, after-party & all sessions · purchase link sent after waitlist review.*
- **STATUS:** WAITLIST OPEN · sub: *Tickets are invite-confirmed after review.*
- **VENUE:** The Space — RiNo, Denver · 3700 N Franklin St, Denver, CO 80205.
- **Map — FIX REQUIRED.** The current iframe uses placeholder junk (`!1s0x876c78f21456e5e7%3A0x4b7a4b7a4b7a4b7a`), rendering a wrong/broken location. Replace with a working Google Maps embed for the real coordinates (`39.7683395586488, -104.96816299173025`) / the address "3700 N Franklin St, Denver, CO 80205". Prefer a query-based embed URL that doesn't depend on a fabricated place-ID, e.g. an `https://www.google.com/maps?q=39.7683395586488,-104.96816299173025&output=embed` style src, or a verified place embed. Verify it renders the correct pin in the browser preview.
- **Getting there box:** `AIRPORT: DEN — RTD A Line → 38th & Blake (~7-min walk)` · `LODGING: Catbird Hotel (~4-min walk) or anywhere in RiNo / downtown` · `NEIGHBORHOOD: RiNo Art District`.

### 5.6 Join the Waitlist — `RegistrationSection` `[005]` (client)

Keep the gradient band + top accent line. Strengthen copy (currently thin). Header e.g. `SECURE YOUR **SPOT**`. Subhead: HPS 2027 is a curated working event ($350, fiat or bitcoin); join the waitlist, tell us who you are, and we'll send the purchase link if you're a fit. Buttons: primary `JOIN THE WAITLIST` (opens `WaitlistModal`, `year={2027}`); secondary `SPONSOR / DEMO INQUIRY` → `mailto:${siteConfig.contact.email}?subject=HPS 2027 Sponsorship` (switch off the mixed hardcoded/config usage — use `siteConfig.contact.email`).

**WaitlistModal:** unchanged — six fields (Name, Email, Company/Org, Industry Focus, Why attend, How you'll contribute), same `/api/summit-invitation` backend, same success copy. Copy/labels may be lightly tuned only.

### 5.7 Sponsorship — `SponsorshipSection` `[006]`

Reframe as an **active call for 2027 sponsors** (no 2027 sponsor grid — none signed yet).
- Header e.g. `SPONSOR HPS **2027**` / `BECOME A **SUPPORTER**`.
- Pitch: focused, technical audience (mining devs, firmware hackers, HVAC/building pros, serious hobbyists, policy people) actually building systems; direct floor/workshop/hallway access; no fixed tiers — reach out and we'll build something that fits.
- Primary CTA: `GET IN TOUCH` → `mailto:${siteConfig.contact.email}?subject=HPS 2027 Sponsorship Inquiry`.
- **Past-supporter strip (social proof):** a subtle logo row clearly labeled **`PAST SUMMIT SUPPORTERS`**, combining **2025 + 2026** sponsors, deduped:
  - 2026 (from `data/sponsors.yaml`): Compass Mining, Exergy, Ocean, TESSERE, Canaan, Human Rights Foundation.
  - 2025 (`/images/summit/2025/`): Luxor, Braiins, Build a Mine Podcast. (Compass already counted — **dedupe**.)
  - Reuse the logo-theming approach already used for sponsor logos (2026 entries have `logo`/`logoDark`; 2025 are white webp needing `filter invert` in light contexts — mirror `SponsorGrid`/existing handling so logos are legible in both themes). Muted opacity, hover to full. Clearly secondary to the CTA.

### 5.8 Past Summits — `PastSummitsSection` `[007]`

Keep the two archive cards (2026 → `/summit/2026`, 2025 → `/summit/2025`) with stats and hover treatment. Content already good; only renumber the tag to `[007]`.

### 5.9 FAQ — `FAQSection` `[008]`

Refresh existing 8 for confirmed dates/price and the ACCELERATE framing, and **add three** (What's included/meals, Lodging/travel, Recordings). Final set:

1. **How much does a ticket cost?** $350 USD, fiat or bitcoin. Purchase link sent after waitlist review (curated to keep signal high).
2. **What's the waitlist — why not just sell tickets?** Working event, kept small/hands-on; we review who attends and prioritize active builders.
3. **When and where is HPS 2027?** Feb 26–27, 2027 at The Space, RiNo, Denver. Optional ski day Feb 25 — details to follow, check back.
4. **What's included in the ticket?** Meals during the summit, the after-party, and full access to all talks, workshops, and the demo floor. (Ski day and travel/lodging not included.)
5. **Where should I stay / how do I get there?** DEN airport → RTD **A Line** → **38th & Blake** (~7-min walk to the venue). **Catbird Hotel** is ~4 min from the venue (~3 from the train) — otherwise anywhere in RiNo / downtown Denver.
6. **Who attends?** Mining devs, firmware hackers, pleb builders, HVAC engineers, building pros, architects, electricians, policy folks, serious hobbyists — the mining × building/heating mix is what makes it unique.
7. **What should I bring?** Laptop for workshops; if you built something relevant, bring it for the demo floor. Casual dress.
8. **Can I demo, lead a workshop, or speak?** Yes — email admin@heatpunks.org. We prioritize live hardware and working builds over slides.
9. **Are sessions recorded?** Yes — prior summits were recorded and posted to YouTube and linked on the [Education page](/education); we plan to record HPS 2027 as well.
10. **Is sponsorship available?** Yes — email admin@heatpunks.org. No fixed tiers; we'll figure out what fits.

(No refund/transfer FAQ — out of scope per interview.)

### 5.10 Manifesto & Community — unchanged

`ManifestoSection` stays (evergreen "UNDERMINE THE STATUS QUO / THE FUTURE OF BITCOIN MINING IS AT HOME"). `SummitCommunitySection` stays; pass `sectionTag="[009]"`.

---

## 6. Page Metadata & Structured Data (`app/summit/page.tsx`)

- **Title:** `Summit 2027` (keep) — or `Heatpunk Summit 2027 — Accelerate`.
- **Description:** rework around ACCELERATE, confirmed date/price, waitlist. E.g. *"Heatpunk Summit 2027 — Feb 26–27 in Denver, CO. The open-source mining stack is here; the barriers are gone. Third annual gathering of bitcoin mining and heating builders. $350, fiat or bitcoin. Join the waitlist."*
- **OG image:** keep the `/api/og` call; subtitle already `FEB 26-27, 2027 • DENVER, CO`. Optionally add ACCELERATE.
- **JSON-LD Event:** already correct (2027 dates, `EventScheduled`, `$350` offer). Verify unchanged and consistent with the copy.

---

## 7. Sitewide Audit

- **Contact/sponsor mailto:** standardize every summit sponsor/demo/proposal link on `siteConfig.contact.email` (= admin@heatpunks.org). Remove hardcoded literals in `Summit2027Hero` and align `RegistrationSection`/`SponsorshipSection`.
- **Stale copy:** remove `data/summit2027.ts` "proof is in the pudding" tagline (§4). Grep the 2027 components for "PLANNING"/"TBD" on dates and for "proof is in the pudding".
- Confirm no other page links to `/summit` with outdated 2026 language (homepage `ATTEND SUMMIT` link is fine).

---

## 8. Out of Scope

- No changes to `/summit/2026`, `/summit/2025`, `/summit/schedule`, or `/summit/[year]`.
- No changes to API routes or the `/api/summit-invitation` backend / waitlist fields.
- No online ticket sales / payment processing (waitlist only).
- No 2027 sponsor logos (added as deals close), no sponsor tiers/portal.
- No 2027 speaker/agenda/workshop specifics (copy says "announced closer").
- No ski-day logistics/booking (date only; "check back").
- No new brand assets, photos, or global design-system changes.
- No refund/transfer policy content.

---

## 9. Acceptance Criteria

1. `/summit` leads with an event-poster hero (flame bg, `// ACCELERATE`, `HEATPUNK SUMMIT 2027`, `FEB 26–27, 2027 · DENVER, CO`, `$350 · FIAT OR BITCOIN`, `WAITLIST OPEN`, waitlist + sponsor CTAs) that is visibly distinct from the homepage hero.
2. Sections render in the §3 order with **sequential, unique** `section-tag`s `[001]`–`[009]`; no duplicates; hero and manifesto untagged.
3. A new **"The Barriers Are Gone"** section exists as the centerpiece: open-stack building blocks (linked to 256 Foundation), "so what will you build?", and the folded-in public data/documentation angle.
4. Why Attend = the 3-year arc ending on **ACCELERATE**; What to Expect is 2027-focused (256-stack workshops) and ends with a demo/workshop/talk call to admin@heatpunks.org.
5. Event Details shows confirmed dates/price/includes, the Catbird + A Line travel guidance, and a **map that pins the correct venue** (verified in preview).
6. Sponsorship is a 2027 call-to-action with a labeled, deduped 2025+2026 "past supporters" strip and no 2027 logos.
7. FAQ has the 10 items in §5.9, including meals/what's-included, lodging/travel, and recordings.
8. All sponsor/demo mailto links resolve to admin@heatpunks.org via `siteConfig.contact.email`.
9. `data/summit2027.ts` copy updated; no "proof is in the pudding" or date-level "PLANNING/TBD" strings remain.
10. `npx tsc --noEmit`, `npm run lint`, and `npm run build` all pass; `/summit`, `/summit/2026`, `/summit/2025`, `/education` all render without console/network errors in the browser preview; light and dark themes both legible.

---

## 10. Implementation Sequence

1. Update `data/summit2027.ts` copy (§4).
2. Rebuild `Summit2027Hero` as the event-poster card (§5.1).
3. Create `BarriersSection` (§5.3) and wire into the page.
4. Rework `WhyAttendSection` (arc → ACCELERATE) and `WhatToExpectSection` (2027 focus + call) (§5.2, §5.4).
5. Fix `Details2027Section` map + travel/includes copy (§5.5).
6. Strengthen `RegistrationSection` copy; standardize mailto (§5.6).
7. Reframe `SponsorshipSection`: CTA + deduped 2025/2026 past-supporter strip (§5.7).
8. Rewrite `FAQSection` items (§5.9).
9. Renumber all `section-tag`s; pass `sectionTag="[009]"` to Community (§3).
10. Update page metadata (§6); sitewide mailto/stale-copy audit (§7).
11. `tsc --noEmit` + `lint` + `build`; verify all routes in the browser preview (map pin, both themes) (§9.10).
