# SPEC — Overhaul the 2026 Summit Archive Page (`/summit/2026`)

**Status:** Approved for implementation (authored 2026-07-21). Scope: **the 2026 archive page only** (`app/summit/2026/page.tsx` and the components it exclusively uses). `/summit/2027` (`/summit`), `/summit/2025`, `/summit/schedule`, and the shared `FAQSection`/`SummitCommunitySection` components must not change behavior anywhere else they're used.

## Background

`/summit/2025` was recently redesigned (commit `e4a0915`, see `SPEC-summit-2025-redesign.md`) into a polished, 2025-scoped archive with its own green signature color. `/summit/2026` still runs the old pre-2027-pivot live-event page verbatim — it was never adapted into an archive. It carries two real bugs plus a stale content problem:

1. **Bug:** the hero's "STATUS: CONCLUDED" field uses a blink animation that is not reliably visible/legible (screenshot shows a dangling `STATUS:` label with no visible value).
2. **Stale UX, not exactly a bug:** the hero's waitlist button currently opens `InvitationModal` (the pre-rename component, superseded by `WaitlistModal`). It needs to point at the current `WaitlistModal` component instead.
3. **Stale content:** the page still reads like a live-event landing page (present/future tense, an "Overview Deck" carousel, generic topic lists) rather than a past-tense archive of a real, completed event with real recorded content.

### Component audit (why this is safe to do in place)

Checked every component the current `/summit/2026` page imports against the rest of the codebase. Only two are actually shared:

| Component | Used elsewhere? |
|---|---|
| `SummitHero`, `AboutSection`, `InfoDeckSection`, `SummitVideoSection`, `WhyWhoSection`, `WorkshopsSection`, `TopicsSection`, `HighlightsSection`, `DetailsSection`, `VenueSection`, `SponsorGrid` | **No** — 2026-page-only. Safe to rewrite in place or delete. |
| `FAQSection` | Yes — also used by `/summit` (2027). **Being removed from this page, not edited.** |
| `SummitCommunitySection` | Yes — used by `/summit`, `/summit/2025`, `/summit/2026`. **Not edited**, only accent-scoped via a wrapper (same trick 2025 used). |

Also found, in passing, fully orphaned dead code that becomes fully unreferenced once this work lands: `components/summit/InvitationModal.tsx` and `components/summit/CTASection.tsx` (nothing outside each other imports `CTASection`; once `SummitHero`/`InvitationModal` usage is removed, nothing imports `InvitationModal` either). **Delete both files** as part of this work.

## Visual identity — the real 2026 brand

Unlike 2025 (which had to invent a look because the poster was broken), 2026 has a real, complete graphic design suite: `Google Drive → Shared drives/Hashrate Heatpunks/Heatpunk Summit/2026 Heatpunk Summit/Graphic Design/`. Pull directly from it:

- **Palette** (`Graphic Design/palette.png`): yellow `#F9ED32` (logo/wordmark text), orange `#F38E20` (accent, **use sparingly** — this is the existing `--accent` token, keep it for cross-year CTAs per the established convention), white, black.
- **Wordmark:** torn-paper / stencil-cut "HASHRATE HEAT PUNK SUMMIT 2026" logotype (`Logo + Image Assets/logo.png`), yellow on transparent.
- **Hero art direction:** thermal-camera (rainbow heat-map) photography of ASIC miners is the signature visual motif across the poster, digital screens, and banners.
- **Hero background image (confirmed):** `Graphic Design/Digital Screen/DigitalScreen2.png` (3840×2160) — black background, cool blue miner casing up top, hot yellow/red concentric thermal rings below, scattered orange spark/dust texture. Use as the hero's background image.

### Signature color decision

2026's signature is **yellow** (`#F9ED32`-family) — distinct from 2025's green and from the orange reserved for cross-year CTAs. Introduce a new theme-aware CSS variable pair for it in `app/globals.css` (mirroring how `--terminal-color` already has light/dark values), e.g.:

- Dark mode: bright yellow, close to `#F9ED32`, tuned for contrast against dark backgrounds.
- Light mode: a deeper amber/gold (not the raw neon yellow — it fails contrast on light backgrounds), e.g. in the `#8a6d00`–`#a37f00` range — pick by testing against `--background`/`--card-background` in light mode until body text meets WCAG AA.

Suggested variable name: `--heatpunk-yellow` (or reuse/extend an existing token if one already fits — check `app/globals.css` first; do not repurpose `--accent`, which stays orange).

**Apply this yellow** to: section tags, heading accent words, stat numbers, in-content emphasis, hover states — anywhere 2025 used `--terminal-color`. **Orange (`--accent`) stays reserved for cross-year CTAs only** (banner "VIEW HPS 2027" link, footer nav, sponsor-CTA-to-2027 link), exactly like the 2025 spec's rule, just swapping which color is "this year" vs "cross-year."

### Theme-awareness

Whole page must render correctly in **both light and dark mode** (site-wide toggle), same rule as 2025 — no forced-black sections outside the hero's intentional dark/photographic treatment. The hero photo (`DigitalScreen2.png`) is inherently dark; overlay it with a scrim/gradient so hero text stays legible in both themes (the photo itself doesn't need to change between themes, only the text/UI drawn over it does).

### Asset migration

Copy from the Google Drive `Graphic Design` folder into `public/images/summit/2026/`:

| Source | Destination | Use |
|---|---|---|
| `Digital Screen/DigitalScreen2.png` | `public/images/summit/2026/hero-thermal.png` | Hero background |
| `Logo + Image Assets/logo.png` | `public/images/summit/2026/logo.png` | Optional wordmark image (evaluate at implementation time whether to use this raster logo or a CSS-rendered heading; either is acceptable — prioritize legibility and theme-safety over literal fidelity) |
| `Snorkel_HRH_HotTub/Snorkel_logo_BoW.png` | `public/images/summit/2026/sponsor-snorkel.png` | Innovation Award milestone callout |
| `Snorkel_HRH_HotTub/PNG Hashrate House Logo Oval.png` | `public/images/summit/2026/sponsor-hashrate-house.png` | Innovation Award milestone callout |

Do not migrate other sponsor logo assets from the drive — the existing `/public/images/sponsors/*` set (used by `data/sponsors.yaml`) is already correct and in use; leave it alone.

---

## Page structure (new)

Replaces the current section list. Order:

1. Archive banner (existing pattern, kept)
2. **Hero** (rewrite)
3. **`[001]` What Was Heatpunk 2026** (rewrite of `AboutSection`, past tense, absorbs `WhyWhoSection`)
4. **Milestones callout** (new — 256 Foundation + Innovation Award, combined)
5. **`[002]` Summit Recap** (recap video + talk grid — keep pattern from 2025, adapt content)
6. **`[003]` Workshops & Topics** (new, merges `WorkshopsSection` + `TopicsSection`)
7. **Event Details** (rewrite of `DetailsSection`, trimmed + past tense)
8. **`[004]` Venue & Travel** (rewrite of `VenueSection`, trimmed + past tense)
9. **Full Schedule** (new — embedded 2026-only schedule display)
10. **Sponsors** (rewrite of `SponsorGrid`, thank-you framing)
11. Community (shared `SummitCommunitySection`, accent-scoped to yellow)
12. Cross-year nav footer (existing pattern, kept, orange)

**Removed entirely:** `InfoDeckSection` (Overview Deck carousel), `HighlightsSection` (redundant icon strip), `FAQSection` usage on this page (its 2026 FAQ content — ticket price, workshops list, milestone, demos, ski day, travel — is either superseded by the new milestones/workshops/details sections or no longer relevant to an archive), `WhyWhoSection` as a standalone (merged into `[001]`).

**Files deleted:** `components/summit/InfoDeckSection.tsx`, `components/summit/HighlightsSection.tsx`, `components/summit/WhyWhoSection.tsx`, `components/summit/TopicsSection.tsx` (merged into new workshops section), `components/summit/InvitationModal.tsx` (orphaned), `components/summit/CTASection.tsx` (orphaned). Confirm via grep that nothing else imports them before deleting.

**Files kept but rewritten in place:** `SummitHero.tsx` (or consider it fully replaced — see Hero section below), `AboutSection.tsx`, `WorkshopsSection.tsx` (absorbs Topics), `DetailsSection.tsx`, `VenueSection.tsx`, `SponsorGrid.tsx`.

---

## Section-by-section

### 0. Archive banner
Keep as-is: `ARCHIVE · HPS 2026 · [VIEW HPS 2027 →]`, orange cross-year link.

### 1. Hero (rewrite)

Background: `DigitalScreen2.png`, full-bleed, with a dark scrim/gradient overlay (adjust opacity so it works in both themes — the image itself is fixed, but a theme-aware gradient overlay on top of it, e.g. darker in dark mode, can still be layered for contrast) so all text sits legibly on top.

Content:
1. **Eyebrow:** `FEBRUARY 27–28, 2026 · DENVER, CO` (mono, yellow signature color).
2. **Wordmark:** "HEATPUNK SUMMIT 2026" — either the migrated `logo.png` raster or a bold mono heading styled to evoke the torn-stencil look (heavy weight, slight rotation/skew on a word or two is acceptable) — in the yellow signature color, legible over the photo in both themes.
3. **Subtitle/tag:** small line, past tense, e.g. `THE SECOND GATHERING · 501(c)(3) LAUNCHED HERE` or similar (finalize wording alongside `[001]` copy — keep consistent).
4. **"PAST EVENT" badge** (pill, yellow — replaces the removed "STATUS: CONCLUDED" blink field entirely; no blinking status text in the new hero).
5. **Stat bar** (5 stats, integrated into hero like 2025): `150+ ATTENDEES · 2 DAYS · 5 WORKSHOPS · 14+ DEMOS · 6 SPONSORS`.
6. **CTAs (three):**
   - Primary: `JOIN THE HPS 2027 WAITLIST` → opens `WaitlistModal` with `year={2027}` (swap the import from `InvitationModal` to `WaitlistModal`; this fixes the "opens the wrong/stale modal" issue).
   - Secondary: `WATCH THE RECORDINGS` → jump-link (`#recap` or similar anchor) to the `[002]` Summit Recap section on this same page.
   - Tertiary: `FULL SCHEDULE` → jump-link to the embedded schedule section (`#schedule` or similar) further down this same page — **not** a link to `/summit/schedule` (that page is being separately reworked for 2027 later and is out of scope here).

No more standalone "SPONSORED BY" strip in the hero (sponsors get their own full section below) — drop that block from the old `SummitHero`.

### 2. `[001]` What Was Heatpunk 2026 (rewrite `AboutSection.tsx`, absorb `WhyWhoSection.tsx`)

Past tense, framed as the second chapter of the summit arc (mirrors the `WhyAttendSection` 2026 card already written for the 2027 page — reuse/echo that framing, don't contradict it):

- 2025 was the first year, bringing the community together for the first time.
- 2026 was the second year — showed the community back together with real organization behind it now (the website, the forum), and showed off a year of progress.
- 2026 introduced **workshops** for the first time, to prompt hands-on collaboration and group problem-solving (previously just talks/panels).
- More systems on display than 2025, more polished.
- The **first-ever Heatpunk Innovation Award** was given out — foreshadow it here, full detail lands in the Milestones callout next.

Fold in `WhyWhoSection`'s "why they attended" reasons (saw innovation, solved challenges, connected) as supporting past-tense color, and keep a "who was there" tag list (reuse the existing tag set — ASIC Designers, FOSS Devs, System Builders, Pleb Miners, Home Builders, Architects, HVAC Techs, Plumbers, Insurers, Energy Modelers, Control Experts) but only once (currently duplicated between the two components — keep one copy).

Section tag `[001]`, accent word in yellow.

### 3. Milestones callout (new component)

One combined section, two items (side-by-side on desktop, stacked on mobile):

**Milestone 1 — 256 Foundation announced:**
> The 256 Foundation — a 501(c)(3) nonprofit — was announced at HPS 2026 to fund and house the open-source mining stack: FOSS firmware, open hardware reference designs, and a documented open-source mining pool implementation.

**Milestone 2 — First Heatpunk Innovation Award:**
> The inaugural Heatpunk Innovation Award went to the **Snorkel × Hashrate House** hot tub — a Snorkel cold-plunge/hot tub heated by a Bitcoin miner, built in partnership with Hashrate House (who built the immersion mining-heat element). It stole the show on the demo floor.
- Include the migrated `sponsor-snorkel.png` and `sponsor-hashrate-house.png` logos, each linking out (Snorkel → `https://snorkel.com`, Hashrate House → `https://www.hashratehouse.com`).
- Link/embed the existing `hps26-award` video (`data/videos.ts`, YouTube ID `dNKZhRVaXbM`) — this is where the reveal actually lives; don't try to narrate the announcement beat-by-beat in prose.

Yellow signature styling, theme-aware card backgrounds.

### 4. `[002]` Summit Recap (recap + talks grid)

Same pattern as 2025's recap section:
- Section tag `[002]`, heading "SUMMIT RECAP", accent word in yellow. Give this section an anchor id (e.g. `id="recap"`) for the hero's jump-link.
- Featured recap video large at top: `summit2026Videos[0]` (`hps26-recap`, YouTube ID `PsRaSv3Y0_k`), reuse `VideoEmbed`.
- **Talk grid:** reuse the existing generic `TalkGrid` component as-is (it already takes a `Video[]` prop and has no 2025-specific styling beyond the shared `--terminal-color` hover accent — check whether that hover color should be overridden to yellow for this page via a CSS variable scope, similar to the `SummitCommunitySection` accent-scoping trick, so the video cards' hover state matches 2026's yellow rather than always being green).
- **Video set for the grid:** recap + keynote + 14 talks + award announcement = **16 videos** (`summit2026Videos` minus the 5 workshop entries — filter out video ids `hps26-workshop-01` through `-05`). Workshop videos do **not** appear here; they're embedded in the Workshops section instead (see below) to avoid duplication.
- Keep a "VIEW FULL PLAYLIST ↗" link using the existing playlist URL (`https://www.youtube.com/watch?v=4FEwVYIvvSU&list=PLgYVdSZznAdM7JVqScdZcKJ5i4ILABNC4`, from `SPEC-summit-2027.md` §6.4) plus a talk count.

### 5. `[003]` Workshops & Topics (merge `WorkshopsSection.tsx` + `TopicsSection.tsx`)

Rewrite `WorkshopsSection.tsx` to absorb `TopicsSection`; delete `TopicsSection.tsx`.

- Section tag `[003]`, heading e.g. "WORKSHOPS & TOPICS", yellow accent, subhead noting 2026 introduced hands-on workshops for the first time (past tense).
- **5 real workshop cards**, each named, past tense, each linking/embedding its own workshop video from `data/videos.ts` (ids `hps26-workshop-01` through `-05`, YouTube IDs `k_x48ErmSh8`, `4FEwVYIvvSU`, `EtJaUA2-okg`, `j-a0Zuy4sDk`, `Pm3yMge-VWo`) — reuse the existing per-workshop summary copy in `WorkshopSummaries` (already past-tense-friendly) as a starting point, tightened to match the new voice.
- Below/alongside the workshop cards, fold in the **topics list** from `TopicsSection` as a compact secondary list (e.g. "Also covered:" — the 10 topic bullets), so that content isn't lost, just demoted to secondary status under the featured workshops.

### 6. Event Details (rewrite `DetailsSection.tsx`, trim + past tense)

Condense the current WHEN/WHERE cards + happy-hour callout into a tighter, past-tense summary — keep the two-card WHEN/WHERE layout but shorten the copy (e.g. "Feb 26: pre-summit ski day + happy hour. Feb 27–28: the summit ran 8am–evening both days at The Space, RiNo, Denver.") Drop the "OPEN TO ALL" happy-hour promo box (that's a forward-looking recruitment device, not archive content) or fold its one useful fact — the happy hour was open to the public — into the WHEN card as a single past-tense line.

### 7. `[004]` Venue & Travel (rewrite `VenueSection.tsx`, trim + past tense)

Keep the venue name/address block and the map (unchanged — same venue, no reason to alter `Map.tsx`). Trim the three icon-cards (RiNo District / Easy Transit / Fly into DIA) down to past tense and consider condensing to fewer, denser cards or a single paragraph, since this is now historical logistics info rather than a "come visit" pitch. Section tag `[004]` (renumber to fit the new flow), yellow accent.

### 8. Full Schedule (new, 2026-only)

Per the scoping decision: **do not** import `ScheduleHeader`/`DayTabs` from `components/schedule/` (those back the separate `/summit/schedule` page, which will be reworked for the 2027 schedule later — keeping this archive page's schedule display independent means that future rework can't break this page).

Build a **new, 2026-archive-scoped** schedule display (new component, e.g. `components/summit/Schedule2026.tsx`) that:
- Reads `data/schedule.yaml` directly via the existing `lib/schedule.ts` (`getScheduleData()`) — same data source, just a separate rendering component.
- Renders all days/sessions (pre-summit, day 1, day 2) — a day-tabbed or day-stacked layout is fine; match whatever's simplest to build well, doesn't need to visually clone `DayTabs`.
- Give the section an anchor id (e.g. `id="schedule"`) for the hero's jump-link.
- No registration/ticket CTAs anywhere in this schedule view — archive only.
- Styled with the 2026 yellow signature + theme tokens.

### 9. Sponsors (rewrite `SponsorGrid.tsx`)

- Header: `HPS 2026 SPONSORS — Thank you.` (thank-you framing, matches 2025's tone).
- Keep the existing sponsor grid layout/logic (light/dark logo swap pattern) — it already works and doesn't need a structural rewrite, just the yellow accent treatment and updated CTA.
- **CTA reframed** (replacing the mailto): `Want to sponsor the next summit? → HPS 2027`, linking internally to `/summit`, styled **orange** (cross-year CTA convention).

### 10. Community
Render the shared `<SummitCommunitySection/>` unchanged in code, wrapped in an accent-scoping div so its heading/icons read yellow on this page only: `<div style={{ ['--accent' as string]: 'var(--heatpunk-yellow)' }}><SummitCommunitySection/></div>` (same technique as 2025's green scoping — verify the exact CSS variable syntax against how 2025 did it in `app/summit/2025/page.tsx`).

### 11. Cross-year nav footer
Keep as-is: `← HPS 2025 ARCHIVE` link and `HPS 2027 →` button, both orange (cross-year), verify contrast in both themes (this is exactly the bug 2025 had to fix for its own footer button — double check this one isn't hiding the same issue).

---

## Metadata / OG

Switch from the static `/images/summit/2026/hero.png` OG image to the dynamic generator, matching 2025's pattern:
```
/api/og?title=HEATPUNK%20SUMMIT%202026&subtitle=The%20second%20gathering%20%E2%80%94%20Denver%2C%20Feb%202026&page=summit
```
Keep page `<title>`/description text as-is or lightly adjust for past-tense consistency; no functional requirement to change it beyond the OG image swap.

## Data model changes

None required. `data/schedule.yaml`, `data/sponsors.yaml`, `data/videos.ts` all already have the needed 2026 content. No new data files.

## Out of scope (do NOT do)

- No changes to `/summit` (2027), `/summit/2025`, or `/summit/schedule`.
- No edits to shared `FAQSection.tsx` or `SummitCommunitySection.tsx` component code (scope via removal-from-this-page or wrapper only).
- No changes to `components/schedule/ScheduleHeader.tsx` or `components/schedule/DayTabs.tsx`.
- No swapping of existing sponsor logos in `/public/images/sponsors/` — leave that set alone.
- No redirect or rework of `/summit/schedule` — that's separate future work for the 2027 schedule.
- No new sponsor tiers, ticket sales, or any live-event registration mechanics on this page — it's a pure archive, aside from the cross-year 2027 waitlist CTA.

## Acceptance criteria

1. `/summit/2026` renders with the new yellow-signature identity, thermal-photo hero, and no leftover "STATUS: CONCLUDED" blink field.
2. The hero's waitlist button opens `WaitlistModal` (not `InvitationModal`) with `year={2027}`; the other two hero CTAs jump-scroll to the recap and schedule sections on the same page.
3. Whole page — including the hero — looks correct and legible in **both light and dark mode**; no contrast failures on text over the hero photo.
4. Yellow (`--heatpunk-yellow` or equivalent) is used consistently for all 2026 content accents; orange (`--accent`) is reserved for cross-year CTAs only (banner, sponsor CTA, footer) and is legible in both themes.
5. `[001]` section, Event Details, and Venue & Travel are rewritten in past tense; `WhyWhoSection` content is merged in and its file deleted.
6. A combined Milestones section covers both the 256 Foundation announcement and the Snorkel × Hashrate House Innovation Award (with linked logos and the award-announcement video).
7. Workshops & Topics is a single merged section listing all 5 real 2026 workshops (each with its own embedded/linked video) plus the secondary topics list; `TopicsSection.tsx` and the standalone `WorkshopsSection` topics duplication are gone.
8. The Summit Recap video grid shows exactly the 16 non-workshop videos (recap, keynote, 14 talks, award announcement) via the reused `TalkGrid` component; no workshop videos duplicated there.
9. A new, 2026-only Full Schedule section renders all sessions from `data/schedule.yaml` independently of `components/schedule/*`.
10. `InfoDeckSection.tsx`, `HighlightsSection.tsx`, `WhyWhoSection.tsx`, `TopicsSection.tsx`, `InvitationModal.tsx`, and `CTASection.tsx` are deleted, confirmed unreferenced anywhere else first.
11. Sponsors section keeps its working logo-grid logic, gets a thank-you header and yellow accent, and its CTA points to `/summit` styled orange.
12. `/summit` (2027), `/summit/2025`, and `/summit/schedule` are **visually and behaviorally unchanged**.
13. `npm run lint` and `npm run build` pass; no console errors on the page in the browser preview.
14. Verified in the browser preview at mobile / tablet / desktop widths, in both themes.
