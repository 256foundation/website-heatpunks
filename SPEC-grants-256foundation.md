# SPEC — Move Grants to the 256 Foundation

**Status:** Approved for implementation (spec authored 2026-07-20). Current at time of writing.

## Summary

Hashrate Heatpunks retires its own **Hashrate Heatpunk Grant Program**. Going forward there is **one** grants program — the **256 Foundation's** — and the Heatpunks site simply describes it and links to it. This deepens Heatpunks' integration into its parent 501(c)(3), the 256 Foundation, and avoids running two competing grant programs.

Concretely: delete the entire `/grants` feature (page, form, API, data, types, email path, status flag), replace the nav "Grants" item with an outbound **256 Foundation** link, repoint every donate button to the Foundation's donate page, add a redirect for the old URL, and re-frame the remaining grants mentions to describe the 256 Foundation program (with an explicit open-source requirement) and link to `256foundation.org/grants`.

## Background / relationship

The **256 Foundation** (`256foundation.org`) is a 501(c)(3) nonprofit for open-source Bitcoin mining — "every layer of Bitcoin infrastructure should be free and open." It runs a **100% passthrough** funding model. Its grants come in two forms: **Core Pillar Grants** (Ember One, Mujina, Libre Board, Hydrapool) and **Open Grants** (community proposals, periodic cycles — "coming soon"), spanning open hardware, firmware, pool software, research, and education. Hashrate Heatpunks is a **project of the 256 Foundation**.

Foundation URLs used in this spec:
- Homepage: `https://256foundation.org`
- Grants: `https://www.256foundation.org/grants`
- Donate: `https://www.256foundation.org/donate`

## Content framing rules (apply to every re-framed grants mention)

1. **Bridge framing.** Present grants as the **256 Foundation** funding open-source Bitcoin mining and mining decentralization, and note that **hashrate heating fits within that mission**. Do not present grants as a Heatpunks-run program.
2. **Open-source requirement — state it explicitly.** The 256 Foundation funds **only open-source work**. Anything produced with grant funding — whether code, documentation, education, or research — **must be released publicly**. Make this unambiguous in the copy (not all grants are code, but all outputs must be open/public).
3. **CTAs.** Grants-info sections use two buttons:
   - Primary: **`SEE THE GRANT PROGRAM ↗`** → `https://www.256foundation.org/grants`
   - Secondary: **`SUPPORT THE MISSION ↗`** → `https://www.256foundation.org/donate`
   Both are external `<a>` links opening in a new tab (`target="_blank" rel="noopener noreferrer"`) with the `↗` marker.

---

## Part A — Deletions

Delete these files entirely:

- `app/grants/page.tsx` (route)
- `app/api/grants/route.ts` (API endpoint)
- `components/grants/` — all 8 files: `HeroSection.tsx`, `WhySection.tsx`, `CategoriesSection.tsx`, `ApplicationSection.tsx`, `FAQSection.tsx`, `DonateSection.tsx`, `ContactSection.tsx`, `GrantsForm.tsx`
- `data/grants.ts`
- `types/grants.ts`

Edit these to remove grant-only code:

- **`lib/email.ts`** — remove `sendGrantApplication()` and its grant-only imports (`GrantApplication` from `@/types/grants`, `categoryOptions` from `@/data/grants`). **Preserve** `sendContactEmail()` and `sendSummitInvitation()` (and any shared transport/helpers they use). Verify no shared helper is only defined inside the grant path.
- **`data/site.ts`** — remove the entire `grants: { open: false }` key and its explanatory comment. Also remove the `DONATE_URL` (Zaprite) constant (see Part C).
- **`app/sitemap.ts`** — remove the `/grants` entry (around line 27).

**Consequence check:** after deletion, `siteConfig.grants.open` must have **zero** references. All current references live in files that are either deleted (grants components, api, data/grants) or edited in Part D (education, mission, landing/GrantsSection). Grep to confirm `grants.open` and `@/data/grants` / `@/types/grants` are fully gone. The `grants@heatpunks.org` mailto disappears with `ContactSection` (the site keeps `admin@heatpunks.org` for the contact form).

Optional (harmless if skipped): `app/api/og` may contain a `page=grants` branch that becomes dead. Leaving it does no harm; remove only if trivially clean.

---

## Part B — Navigation

**File:** `data/site.ts` → `navigation` array. **Also covers** `components/layout/Header.tsx` (desktop) and `components/layout/MobileNav.tsx` (mobile), both of which render the array generically — no component logic changes needed for the item itself.

Target order and definition:

```
Home            { name: 'Home', href: '/' }
Mission         { name: 'Mission', href: '/mission' }
Education       { name: 'Education', href: '/education' }
Summit          { name: 'Summit', href: '/summit' }
Forum           { name: 'Forum', href: FORUM_URL, external: true, newTab: false }
Group Chat      { name: 'Group Chat', href: TELEGRAM_URL, external: true }
256 Foundation  { name: '256 Foundation', href: 'https://256foundation.org', external: true, variant: 'outline' }
```

Changes vs. today:
- **Remove** the old `{ name: 'Grants', href: '/grants' }` item.
- **Remove** the old `{ name: 'Donate', href: DONATE_URL, external: true, variant: 'outline' }` item.
- **Add** the `256 Foundation` item as the **last** item.
- `Summit` moves ahead of the external cluster (it was already before Forum; keep it as the last internal page).

Rendering behavior (already implemented in `Header.tsx`/`MobileNav.tsx`, confirm it holds):
- `external: true` + `variant: 'outline'` → **outlined/bordered** button (border-accent), distinct from the solid-filled Forum & Group Chat buttons.
- `newTab` unset (defaults to new tab) → opens in a new tab with the `↗` marker. (Forum stays same-tab via `newTab: false`.)
- Desktop: three buttons in a row — FORUM (solid) · GROUP CHAT (solid) · 256 FOUNDATION (outlined).
- Mobile: renders as an external row with `↗`; variant styling is not applied on mobile (acceptable — matches current behavior).

The nav no longer contains a standalone Donate button anywhere.

---

## Part C — Donate URL (sitewide)

**File:** `data/site.ts`

- Change `foundation.donate` to **`https://www.256foundation.org/donate`**.
- **Delete** the `DONATE_URL = 'https://pay.zaprite.com/pl_TFoKMotEqk'` constant (now fully unused — the nav Donate item is removed and `foundation.donate` no longer references it).

Because every donate button in the app reads `siteConfig.foundation.donate`, this single change repoints all of them (landing hero/donate/grants sections, education, mission, footer). No per-button edits required for the URL. Confirm via grep that no other hard-coded Zaprite/`pay.zaprite` URL remains.

The copy "USD & Bitcoin accepted via Zaprite" in `components/landing/DonateSection.tsx` stays — the Foundation's donate page still processes via Zaprite, so the statement remains accurate.

---

## Part D — Re-framed grants mentions

### D1. Homepage grants section — `components/landing/GrantsSection.tsx`

Keep the section (heading `[003] FUND THE FUTURE`) and **keep the existing four chips** (⚡ STANDARDS · 📊 RESEARCH · 📖 DOCUMENTATION · 🎓 EDUCATION).

- Remove the `siteConfig.grants.open` conditional entirely.
- Rewrite the paragraph to the bridge framing + open-source requirement. Suggested copy:
  > "Grants are run by our parent nonprofit, the **256 Foundation**, which funds open-source Bitcoin mining and mining decentralization — and hashrate heating fits squarely within that mission. One catch: the Foundation funds **open-source work only**, so whatever you build, document, or teach with a grant must be released publicly."
- Replace the CTA block with the two standard buttons (Part D framing rule #3): primary `SEE THE GRANT PROGRAM ↗` → Foundation grants; secondary `SUPPORT THE MISSION ↗` → Foundation donate. Both external, new tab, `↗`. Remove the `Link href="/grants"` usages and the `Link` import if it becomes unused.

### D2. Education "resources in development" — `app/education/page.tsx` (~lines 104–143)

- Remove the `siteConfig.grants.open` conditionals.
- Rewrite the grants paragraph to attribute funding to the **256 Foundation** with the open-source requirement, replacing "through the Hashrate Heatpunk Grant Program." Keep the point that the Foundation funds educational content/documentation/training for this industry, but frame it as the Foundation's open-source program.
- Replace the CTA with the two standard buttons (`SEE THE GRANT PROGRAM ↗` → grants, `SUPPORT THE MISSION ↗` → donate). Remove the `Link href="/grants"` and unused `Link` import if applicable.

### D3. Mission page — `app/mission/page.tsx`

- **Approach card** (`approaches` array, "Fund development"): update the description to attribute funding to the 256 Foundation and reflect open-source-only. Suggested: `title: 'Fund development'`, `description: '256 Foundation grants for open-source mining & heating work'`.
- **CTA block `[005] JOIN THE MOVEMENT`:** remove the `siteConfig.grants.open` conditional and the `APPLY FOR A GRANT` `Link`. The block keeps exactly two buttons: **`SUPPORT THE MISSION ↗`** (→ `foundation.donate`, styled as the primary `btn-primary` button) and **`LEARN MORE`** (→ `/education`). **Do not** add a grants button here. Remove the now-unused `Link` import if nothing else uses it, and simplify the button's ternary (it no longer needs the `grants.open` branch).

### D4. Homepage donate section — `components/landing/DonateSection.tsx`

No structural change. The `GRANTS PROGRAM — Funding builders and researchers` impact tile stays (still accurate: donations fund Foundation grants). The `DONATE TO SUPPORT GRANTS ↗` button already uses `foundation.donate`, so it auto-repoints to the Foundation donate page via Part C. No edit required beyond what Part C provides.

### D5. Footer — `components/layout/Footer.tsx`

- **NAVIGATE column:** remove the `GRANTS` `Link` (→ `/grants`). Column becomes HOME · MISSION · EDUCATION · SUMMIT.
- Leave the existing "A PROJECT OF THE 256 FOUNDATION" copyright link and any donate link (auto-repointed by Part C) as-is.

---

## Part E — Redirect for the old URL

**File:** `next.config.js`

Add an `async redirects()` returning a **permanent (308)** redirect:

```js
async redirects() {
  return [
    {
      source: '/grants',
      destination: 'https://www.256foundation.org/grants',
      permanent: true,
    },
  ];
}
```

Preserve the existing `output`, `images`, and `headers()` config. This ensures old bookmarks, search results, and inbound links to `heatpunks.org/grants` forward cleanly to the real program instead of 404ing.

---

## Part F — Documentation

- **`CLAUDE.md`** — remove/adjust stale grants content:
  - "Working efficiently" data table: delete the **grant program open/closed** (`grants.open`) row and the **Grant categories / FAQ copy** (`data/grants.ts`) row.
  - Architecture / routes: remove `/grants` from the routes list; remove `POST /api/grants` from the API routes list.
  - Update the intro to state that the **grant program is run by the 256 Foundation** (Heatpunks links to it), not a Heatpunks-run program.
  - Remove references to `data/grants.ts` / grant types where they imply a live feature.
- **`SPEC-grants-256foundation.md`** — this file (the record of the change).
- **Leave `SPEC.md` and `ARCHITECTURE.md` untouched** (already flagged as historical pre-launch docs).
- Update project memory `foundation-relationship.md` to mark the grants move as **done** once implemented.

---

## Out of scope (explicitly NOT doing)

- No changes to the Discourse forum feed, Summit pages, contact form, or summit-invitation flow.
- Not building any new grants UI on Heatpunks — there is no Heatpunks grants page, form, or API after this change.
- Not modifying the 256 Foundation website (external, separate repo).
- Not changing the donate payment processor (still Zaprite, reached via the Foundation's `/donate` page).

## Acceptance criteria

1. Visiting `/grants` returns a **308 redirect** to `https://www.256foundation.org/grants` (verify in build/preview; the route no longer renders a page).
2. Grep shows **no remaining references** to: `siteConfig.grants` / `grants.open`, `@/data/grants`, `@/types/grants`, `sendGrantApplication`, `pay.zaprite`, or `DONATE_URL`.
3. Desktop nav reads: Home · Mission · Education · Summit · **FORUM** (solid) · **GROUP CHAT** (solid) · **256 FOUNDATION** (outlined, opens `256foundation.org` in a new tab). No Donate button in the nav.
4. Mobile nav lists the same items; `256 FOUNDATION` shows the `↗` and opens in a new tab.
5. Every donate button/link on the site navigates to `https://www.256foundation.org/donate`.
6. Homepage `[003]` section: re-framed copy (bridge + open-source requirement), original four chips retained, two buttons (`SEE THE GRANT PROGRAM ↗` → Foundation grants, `SUPPORT THE MISSION ↗` → Foundation donate).
7. Education "resources in development" section: re-framed copy + the same two buttons.
8. Mission page: approach card re-attributed to the Foundation; `JOIN THE MOVEMENT` shows only `SUPPORT THE MISSION ↗` + `LEARN MORE` (no apply/grants button).
9. Footer NAVIGATE column: HOME · MISSION · EDUCATION · SUMMIT (no GRANTS).
10. `npm run lint`, `npm run build`, and `npm run test` all pass (no unused imports, no dangling types, no broken internal `/grants` links).
11. `CLAUDE.md` no longer documents a Heatpunks-run grant program, the `grants.open` flag, the `/grants` route, or `/api/grants`.
