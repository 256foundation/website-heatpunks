# SPEC — Redesign the 2025 Summit Archive Page (`/summit/2025`)

**Status:** Approved for implementation (authored 2026-07-21). Scope: **the 2025 archive page only**. The 2026 archive (`/summit/2026`) and the forward-looking 2027 summit page (`/summit`) must render **exactly as they do today** — no visual or behavioral change.

## Goal

The current `/summit/2025` page looks broken. Redesign it into a polished, cohesive archive of the first Heatpunk Summit ("Undermine", Feb 21–22 2025, Denver CO), using the 2025 event's own visual identity (the metallic "UNDER|MINE" lockup, the fan/turbine motif, a dark industrial mood) as design inspiration — while staying consistent with the heatpunks.org type/theme system.

## Files

- **Primary:** `app/summit/2025/page.tsx` (rewrite).
- **New (2025-scoped) components** under `components/summit/` — see each section. Prefer new small components or inline markup so **shared** components used by 2026 are not modified.
- **Data:** `data/summit2025.ts` (already correct — Feb 21–22, Denver, "The Space", ~150 attendees, 4 sponsors, 14 talks). `data/videos.ts` → `summit2025Videos` (recap at index 0, talks after). No data schema changes required.
- **Do NOT edit** these shared components (used by 2026): `components/summit/SponsorGrid.tsx`, `components/shared/VideoCarousel.tsx`, `components/summit/SummitCommunitySection.tsx`. Reuse `components/shared/VideoEmbed.tsx` freely (single-video embed, safe).

## Global rules

### Color / signature
- **Green is the 2025 signature.** Use the existing theme-aware token **`var(--terminal-color)`** (bright green `#00ff41` in dark, legible `#008f24` in light) for all 2025-specific accents: section tags, headings' accent word, stat numbers, in-content links, hover states.
- **Orange (`var(--accent)`) is reserved for cross-year CTAs only** — the top archive-banner "HPS 2027" link, and the footer "HPS 2026 ARCHIVE" / "HPS 2027" nav. Do not globally override `--accent` on the page (that would turn cross-year CTAs green). Instead apply green explicitly where needed.
- **Shared community section green scoping:** the page renders the shared `<SummitCommunitySection/>`. To make its orange `--accent` heading render green **on this page only**, wrap that one instance in a scoping element: `<div style={{ ['--accent' as string]: 'var(--terminal-color)' }}><SummitCommunitySection/></div>`. This affects only the 2025 DOM subtree; 2026's instance is untouched. (Its icons are already green.)

### Theme-awareness (both light & dark)
- The **whole page must look right in both light and dark mode** and follow the visitor's theme (no forced-black regions, no black→cream seam). Replace every literal `black`/`from-black` in the hero with theme tokens.
- All new styling uses theme variables (`--background`, `--background-alt`, `--card-background`, `--card-border`, `--foreground`, `--muted`, `--terminal-color`). Verify contrast in both modes.

---

## Section-by-section

### 0. Top archive banner (keep, refine)
Keep the slim banner: `ARCHIVE · HPS 2025 · [VIEW HPS 2027 →]`. The "VIEW HPS 2027 →" link stays **orange** (cross-year, `--accent`) and legible in both themes.

### 1. Hero (rewrite — biggest change)
Remove the `<Image src="/images/summit/2025/hero.jpg">` and its `from-black` gradient entirely. The poster's baked-in text (wrong "November 16–17 / COLORADO" date, "HASH PUNKS MINE HEAT", its own UNDER|MINE) was colliding with the overlaid HTML — that is the core bug. **No poster image in the hero.**

New hero — a `min-h-[70vh]` (approx) section, **theme-aware background** that blends into the body (dark charcoal/near-black gradient in dark mode; a tonal cream/`--background-alt` treatment in light mode — NOT pure white, subtly darker than the next section so it reads as a hero but has no hard seam). Include the existing `noise-overlay`.

Contents, centered or left-aligned within `section-container`, bottom-anchored:
1. **Eyebrow:** `FEBRUARY 21–22, 2025 · DENVER, CO` in mono, green (`--terminal-color`).
2. **Metallic wordmark "UNDER | MINE":** the title lockup with a **vertical divider bar** between UNDER and MINE. Render the letters with a **metallic gradient text** treatment (`background-clip: text; color: transparent`):
   - Dark mode: silver gradient (e.g. `#f5f5f5 → #9aa0a6 → #e8e8e8`).
   - Light mode: graphite/steel gradient (e.g. `#3a3a3a → #7a7a7a → #2c2c2c`) for contrast on the light hero.
   - The divider bar `|` in green (`--terminal-color`). Large, heavy mono, `clamp()` responsive.
3. **Subtitle:** `HEATPUNK SUMMIT 2025` — mono, tracked, `--foreground` at reduced opacity.
4. **Tagline:** `summit2025.tagline` ("The first gathering. The spark that started it all.") or `summit2025.takeaway` (keep it to one short line) in `--muted`.
5. **Stats row (integrated into the hero):** a clean horizontal row at the bottom of the hero — `~150 ATTENDEES · 2 DAYS · 10+ LIVE DEMOS · 4 SPONSORS · 14 TALKS`, numbers in green (`--terminal-color`), labels in `--muted`. Wraps/scrolls gracefully on mobile. (Removes the separate stats band below the hero.)

**Fan/turbine motif:** behind the hero content, a subtle **SVG fan/turbine graphic** (concentric circles + crosshair spokes + suggested blades) echoing the poster and a mining fan. Low opacity so text stays legible in both themes. It **slowly rotates** (CSS `@keyframes spin` ~40–60s linear infinite). Wrap in a `motion-reduce:animate-none` (or a `@media (prefers-reduced-motion: reduce)` rule) so it holds still for users who opt out. The SVG is authored fresh (the original is trapped in the poster raster); a simple concentric-ring + spoke design is sufficient.

### 2. Origin story + event details (keep, condense)
Keep the two-column layout: narrative left, `EVENT DETAILS` panel right. **Condense the narrative from four paragraphs to ~two tight paragraphs** (keep: first-ever gathering of ~150 mining + heating people; the "undermine the status quo" intent; the takeaway that heatpunks.org + forum were born here). Section tag `[001]` and the accent word ("FIRST GATHERING") in green. Keep the `EVENT DETAILS` list (EVENT / DATES / VENUE / ADDRESS / ATTENDEES / LIVE DEMOS / TALKS) as-is, restyled with green labels/`--muted` where appropriate. Theme-aware backgrounds.

### 3. Recap + talks (rewrite the talks layout)
- Section tag `[002]`, heading `SUMMIT RECAP` with accent word in green.
- **Featured recap video** (`summit2025Videos[0]`) large and prominent at the top (reuse `VideoEmbed`, bordered, `max-w-4xl` centered).
- **Talks grid:** replace the horizontal `VideoCarousel` with a **2025-specific responsive thumbnail grid** (new component, e.g. `components/summit/TalkGrid.tsx`, or inline). One card per talk (`summit2025Videos.slice(1)`), each: YouTube thumbnail with a play affordance (reuse `VideoEmbed` per card, or thumbnail-that-opens), **title** and a short line from `description` (speaker/topic is embedded in title/description — there is no separate speaker field). Responsive: 1 col mobile → 2 → 3 on desktop. Do **not** modify the shared `VideoCarousel`.
- Keep the **`VIEW FULL PLAYLIST ↗`** link (`summit2025.youtubePlaylistUrl`) prominent near the grid header, plus a talk count (`ALL TALKS (n)`).
- "Watch the talks" is a primary action — make the recap + playlist visually prominent.

### 4. Sponsors (rewrite the layout, 2025-scoped)
Do **not** use the shared `SponsorGrid` here (it's used by 2026). Build a **2025-specific sponsor section** (new component `components/summit/SponsorRow2025.tsx` or inline) that renders `sponsors2025`:
- **Centered auto-fit flex row** that wraps naturally (`flex flex-wrap justify-center`), so 4 sponsors sit balanced (no orphaned 3+1 grid). Consistent card sizing with **larger, consistently-sized logos** (less empty space than today).
- Section tag `[SPONSORS]`, heading `SUMMIT SPONSORS` accent word in green, "Thank you to our sponsors…" subline.
- Sponsor logos: keep the light/dark logo handling pattern (logos are `.webp`; render `object-contain`, opacity hover). Theme-aware card backgrounds/borders.
- **Sponsor CTA reframed** for an archive: `Want to sponsor the next summit? → HPS 2027` linking to `/summit` (internal), styled **orange** (cross-year). Replace the current `mailto:` "Interested in sponsoring? Contact us" line.

### 5. Community (keep shared component, scope green)
Render the shared `<SummitCommunitySection/>` unchanged in code, wrapped in the `--accent → --terminal-color` scoping div (see Global rules) so its heading reads green on this page only.

### 6. Cross-year nav footer (keep, fix bug)
Keep the bottom nav band: `← END OF ARCHIVE`, `HPS 2026 ARCHIVE →` (link), and the **`HPS 2027 →` button**. Keep these **orange** (cross-year). **Fix the near-invisible button text** — ensure the `HPS 2027 →` button label has correct contrast in both themes (verify `btn-primary` renders its `--accent-contrast` text above the `btn-heat` overlay; if the overlay is covering the text, fix z-index/markup so the label is clearly readable). All three must be legible in light and dark.

---

## Metadata / OG
The current OG image points at the mismatched poster (`/images/summit/2025/hero.jpg`, wrong date). **Switch the OG image to the dynamic generator** used elsewhere: `/api/og?title=...&subtitle=...` (e.g. title "Undermine · HPS 2025 Archive", subtitle "The first gathering — Denver, Feb 2025"). Keep the page `<title>`/description copy. The `hero.jpg` asset is then unused by the page; it may remain in the repo or be deleted (no longer referenced).

## Out of scope (do NOT do)
- No changes to `/summit/2026`, `/summit`, `/summit/schedule`, or `/summit/[year]`.
- No edits to shared components `SponsorGrid.tsx`, `VideoCarousel.tsx`, `SummitCommunitySection.tsx` (scope via wrappers/new components instead).
- No photo gallery / no new event photos (video-first).
- No data-model changes to `videos.ts` or `summit2025.ts`.
- No new dedicated "Attend HPS 2027" band (top banner + footer only).

## Acceptance criteria
1. `/summit/2025` renders with **no poster image** in the hero; the metallic "UNDER | MINE" lockup, subtitle, date/location, tagline, and an integrated green stats row are all cleanly legible — **no overlapping/garbled text**.
2. The hero and entire page look correct and seam-free in **both light and dark mode** (toggle `prefers-color-scheme`); no forced-black regions.
3. The hero fan motif **rotates slowly** and **stops** under `prefers-reduced-motion: reduce`.
4. Green (`--terminal-color`) is used consistently for all 2025 content accents; **cross-year CTAs (top banner HPS 2027, footer HPS 2026/2027) remain orange** and legible — the footer `HPS 2027 →` button text is clearly visible.
5. Sponsors render as a **centered, balanced row** (no orphaned card) with appropriately sized logos; the sponsor CTA points to **HPS 2027**.
6. Talks render as a **responsive grid** (not a carousel) with titles; the recap video is featured; the full-playlist link is present. The shared `VideoCarousel` is unchanged.
7. Origin story is **condensed**; event-details panel retained.
8. `/summit/2026` and `/summit` are **visually unchanged** (diff shows no effective change to their output).
9. `npm run lint` and `npm run build` pass; no console errors on the page in the browser preview.
10. Verified in the browser preview at mobile / tablet / desktop widths in both themes.
