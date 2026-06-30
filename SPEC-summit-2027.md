# HPS 2027 Summit Page Spec

**Purpose:** Update the Hashrate Heatpunks website for the 2027 Heatpunk Summit.  
**Scope:** New 2027 summit page, rich archive pages for 2025 and 2026, sitewide copy/language updates.

---

## 1. URL & Route Structure

| URL | Purpose |
|---|---|
| `/summit` | **2027 summit page** — forward-looking, primary destination |
| `/summit/2026` | **2026 rich archive** — full schedule, sponsors, videos, highlights |
| `/summit/2025` | **2025 rich archive** — Undermine branding, sponsors, videos, highlights |

The current `/summit/[year]` stub route will be rewritten to render real content.

---

## 2. Language Changes (Sitewide)

| Old | New |
|---|---|
| "Request Invite" / "Request Ticket" | "Join the Waitlist" |
| `InvitationModal` | `WaitlistModal` (rename component) |

Audit all occurrences across all pages and components. Known locations:
- `components/summit/RegistrationSection.tsx` — button label
- `components/summit/InvitationModal.tsx` — modal title/copy
- `app/summit/page.tsx` — any inline copy
- Any other page that links to summit registration

---

## 3. Asset Migration

Copy assets from project root into `/public/images/` before building pages.

### 2025 Assets → `/public/images/summit/2025/`
- `2025 Summit Assets/Sponsor_Images/BAM.webp` → `/public/images/summit/2025/sponsor-bam.webp`
- `2025 Summit Assets/Sponsor_Images/braiins.webp` → `/public/images/summit/2025/sponsor-braiins.webp`
- `2025 Summit Assets/Sponsor_Images/compass.webp` → `/public/images/summit/2025/sponsor-compass.webp`
- `2025 Summit Assets/Sponsor_Images/luxor.webp` → `/public/images/summit/2025/sponsor-luxor.webp`
- `2025 Summit Assets/UnderMine_Branding/UnderMine_Summit.jpg` → `/public/images/summit/2025/hero.jpg`
- `2025 Summit Assets/UnderMine_Branding/banner.png` → `/public/images/summit/2025/banner.png`

### 2026 Assets → `/public/images/summit/2026/`
- `2026 Summit Assets/Logo + Image Assets/thermalimage.png` → `/public/images/summit/2026/hero.png` (use as archive hero — most striking)
- `2026 Summit Assets/Logo + Image Assets/logo.png` → `/public/images/summit/2026/logo.png`
- `2026 Summit Assets/Poster/postermockup.png` → `/public/images/summit/2026/poster.png`
- `2026 Summit Assets/Digital Screen/DigitalScreen1.png` → `/public/images/summit/2026/screen1.png`

---

## 4. Data Files

### New: `data/summit2025.ts`
```ts
export const summit2025 = {
  year: 2025,
  name: 'Undermine: Heatpunk Summit 2025',
  shortName: 'HPS 2025',
  tagline: 'The first gathering. The spark that started it all.',
  dates: { day1: 'TBD', day2: 'TBD' }, // confirm actual 2025 dates
  venue: {
    name: 'The Space',
    address: '3700 N Franklin St, Denver, CO 80205',
    city: 'Denver, CO',
  },
  stats: {
    attendees: '~150',
    days: 2,
    demos: '10+',
  },
  youtubePlaylistUrl: 'https://www.youtube.com/watch?v=xarEPPMGdxU&list=PLgYVdSZznAdN3scDRRbUktk6quW3RtMgA',
  recapYoutubeId: 'c-NrYzmPRv8',
  takeaway: 'First time ever bringing together mining developers, builders, pleb miners, tinkerers, and heating & building experts in the same room. The takeaway: we need to organize. Heatpunks.org and the forum were born from these conversations.',
  sponsors: [
    { name: 'Luxor', url: 'https://luxor.tech', logo: '/images/summit/2025/sponsor-luxor.webp' },
    { name: 'Braiins', url: 'https://braiins.com', logo: '/images/summit/2025/sponsor-braiins.webp' },
    { name: 'Compass Mining', url: 'https://compassmining.io', logo: '/images/summit/2025/sponsor-compass.webp' },
    { name: 'Build a Mine Podcast', url: 'https://bitcoinminingworld.com', logo: '/images/summit/2025/sponsor-bam.webp' },
  ],
};
```

### New: `data/summit2027.ts`
```ts
export const summit2027 = {
  year: 2027,
  name: 'Heatpunk Summit 2027',
  shortName: 'HPS 2027',
  tagline: 'The proof is in the pudding.',
  theme: 'Year of documentation and results — FOSS firmware is live, case studies are written, now we build on them.',
  dates: {
    skiDay: '2027-02-25',   // optional, details TBD
    day1: '2027-02-26',
    day2: '2027-02-27',
  },
  venue: {
    name: 'The Space',
    address: '3700 N Franklin St, Denver, CO 80205',
    city: 'Denver, CO',
    timezone: 'America/Denver',
    coordinates: { lat: 39.7683395586488, lng: -104.96816299173025 },
  },
  ticket: {
    price: 350,
    currency: 'USD',
    paymentOptions: ['fiat', 'bitcoin'],
    note: "Tickets are $350. You can pay in fiat or bitcoin. Joining the waitlist indicates your interest — if selected, you'll receive a link to purchase.",
  },
  activityTypes: ['talks', 'workshops', 'demos', 'networking'],
  sponsorContact: 'admin@heatpunks.org',
};
```

### Existing data files:
- `data/schedule.yaml` — 2026 schedule; now used exclusively by the 2026 archive page
- `data/sponsors.yaml` — 2026 sponsors; now used exclusively by the 2026 archive page

---

## 5. `/summit` — 2027 Summit Page

Replaces current `app/summit/page.tsx`. The existing page structure is a good skeleton; most sections get new content or are replaced.

### 5.1 Page Metadata
```
title: 'Heatpunk Summit 2027'
description: 'Heatpunk Summit 2027 — Feb 26-27 in Denver, CO. Join the waitlist for the third annual gathering of bitcoin mining and heating builders.'
eventSchema JSON-LD: update all fields — 2027 dates, eventStatus: EventScheduled
```

### 5.2 Section Order

1. SummitHero (updated)
2. AboutSection / Manifesto (keep as-is — no changes)
3. WhyAttendSection (rewritten — summit arc narrative)
4. WhatToExpectSection (new — replaces Workshops/Topics/InfoDeck with general activity types)
5. DetailsSection (updated for 2027 dates + ski day note)
6. VenueSection / Map (same address, no changes needed)
7. RegistrationSection (updated — "JOIN THE WAITLIST")
8. SponsorshipSection (new component)
9. FAQSection (rewritten for 2027)
10. PastSummitsSection (new — links to /summit/2026 and /summit/2025)

**Removed from 2027 page** (content moves to /summit/2026 archive):
`InfoDeckSection`, `WorkshopsSection`, `TopicsSection`, `HighlightsSection`, `SponsorGrid`, `SummitVideoSection`, `SummitCommunitySection`

### 5.3 SummitHero (updated)

**Headline:** `HEATPUNK SUMMIT 2027`  
**Dates badge:** `FEB 26–27, 2027 · DENVER, CO`

**Stat bar — mix of 2026 retrospective + 2027 forward:**
- `150+ BUILDERS` (labeled "attended in 2026")
- `3RD ANNUAL`
- `$350 TICKETS`
- `THE SPACE, DENVER`

No sponsors strip (none confirmed yet for 2027).

**CTAs:**
- Primary: `JOIN THE WAITLIST →` (opens WaitlistModal)
- Secondary: `SPONSOR / DEMO INQUIRY` (mailto:admin@heatpunks.org?subject=HPS 2027 Sponsorship)

### 5.4 WhyAttendSection (rewritten)

Three cards representing the summit arc:

**Card 1 — 2025: The Spark**
> The first Heatpunk Summit brought together mining developers, pleb builders, tinkerers, and heating and building experts for the first time ever. 150 people in the same room who had never met. The takeaway: we needed to get organized. That gathering led directly to heatpunks.org, the forum, and everything since.

**Card 2 — 2026: The Foundation**
> The second summit showed what organization looks like. More polished demo systems. More expertise. Professionals from ASHRAE and the DOE. Mining firmware developers. Building engineers. The 256 Foundation — a 501(c)(3) — was announced at this summit to house the community and fund the open-source mining stack: FOSS firmware, reference hardware designs, and an open-source, documented mining pool implementation.

**Card 3 — 2027: The Proof**
> The FOSS firmware is in the wild. Case studies have been written. The hardware building blocks exist. HPS 2027 is the year we show what's been built, document what works, and push the industry forward with evidence. Come ready to share what you've done and learn from everyone else who's been building.

Section CTA below cards: `JOIN THE WAITLIST →` (same modal)

### 5.5 WhatToExpectSection (new component)

**Section tag:** `[002]`  
**Header:** `WHAT HAPPENS AT THE SUMMIT`

Four activity-type cards:
- **Talks & Presentations** — Industry experts, developers, and builders presenting on the state of hashrate heating technology and the open-source mining stack
- **Hands-On Workshops** — Learn by doing. Bring your laptop. Get into the firmware, hardware, and software with people who build it
- **Live Hardware Demos** — See real hashrate heating systems running on-site. 10+ demo systems were running at HPS 2025 and 2026
- **Networking & Social** — Meals, an after-party, and the optional ski day (Feb 25 — details TBD) for connecting with the people building this industry

Note: `Full agenda and speaker lineup will be announced as we get closer to the event. Join the waitlist to stay informed.`

### 5.6 DetailsSection (updated)

**Summit dates:** February 26–27, 2027  
**Ski day:** February 25, 2027 — Optional pre-summit ski day. More details coming soon.  
**Venue:** The Space, 3700 N Franklin St, Denver, CO 80205 (RiNo district)  
**Getting there:** A Line train from DIA → 38th & Blake station → short rideshare to The Space  
**Ticket:** $350 · Pay in fiat or bitcoin

### 5.7 VenueSection / Map

No changes. Same coordinates, same venue. Reuse existing components verbatim.

### 5.8 RegistrationSection (updated)

**Section tag:** `[006]`  
**Header:** `HEATPUNK SUMMIT 2027`  
**Subhead:** `Planning is underway for HPS 2027. Join the waitlist — if you're a good fit, you'll get the link to buy your ticket.`

**CTAs:**
- Primary: `JOIN THE WAITLIST` button → opens WaitlistModal
- Secondary: `SPONSOR / DEMO INQUIRY` → mailto:admin@heatpunks.org?subject=HPS 2027 Sponsorship

### 5.9 WaitlistModal (renamed from InvitationModal)

**Component rename:** `InvitationModal.tsx` → `WaitlistModal.tsx`  
**Title:** `JOIN THE HPS 2027 WAITLIST`

**Description shown inside modal (above the form fields):**
```
Heatpunk Summit 2027 · Feb 26–27, Denver, CO

Tickets are $350. You can pay in fiat or bitcoin when your spot is confirmed.

Tell us who you are and why you want to attend. If you're a good fit for the 
summit, we'll send you the link to purchase your ticket.
```

**Form fields (unchanged):**
1. Name (required)
2. Email (required)
3. Why do you want to attend? (textarea, required)

**Submit button text:** `JOIN THE WAITLIST`  
**Backend:** Same API endpoint and email flow as current InvitationModal — no changes.  
**Success message:** Same confirmation copy as current.

### 5.10 SponsorshipSection (new component)

**Section tag:** `[007]`  
**Header:** `SPONSOR HEATPUNK SUMMIT 2027`

**Pitch copy:**
> Heatpunk Summit draws the most dedicated builders in the Bitcoin mining and hashrate heating space — firmware developers, hardware engineers, HVAC professionals, home miners, policy experts, and industry founders. These are the people designing and installing the next generation of mining-based heating systems.
>
> Sponsoring HPS 2027 puts your brand in front of this community with direct exposure during talks, demos, and workshops across two days in Denver.

**Past sponsors row** (labeled `PAST SUMMIT SUPPORTERS`):
Show combined logos from 2025 and 2026 as social proof. Use existing sponsor logos from `/public/images/sponsors/` plus the 2025 logos once moved.

Logos: Compass Mining, Exergy, Ocean, TESSERE, Canaan, HRF (2026) + Luxor, Braiins, Build a Mine Podcast (2025).

**CTA:**
- Button: `GET IN TOUCH ↗` → `mailto:admin@heatpunks.org?subject=HPS 2027 Sponsorship Inquiry`
- Supporting text: `Reach out to discuss sponsorship or demo opportunities at HPS 2027.`

### 5.11 FAQSection (rewritten for 2027)

Replace all current FAQ items with:

1. **How much does it cost to attend?**  
   $350 per person. You can pay in fiat or bitcoin. Joining the waitlist doesn't commit you to payment — if you're offered a spot, you'll receive a secure link to complete your purchase.

2. **When and where is HPS 2027?**  
   February 26–27, 2027 at The Space, 3700 N Franklin St, Denver, CO 80205 (RiNo district).

3. **What's the ski day?**  
   We're planning an optional pre-summit ski day on February 25. Details are still being worked out. Join the waitlist and you'll be kept in the loop.

4. **How do I get a ticket?**  
   Join the waitlist. We review submissions and reach out to attendees who are a strong fit for the event. If selected, you'll receive a link to purchase your $350 ticket. The event is intentionally intimate — around 150–200 people.

5. **Who attends the summit?**  
   Builders, firmware developers, hardware engineers, pleb miners, professional HVAC installers, architects, building scientists, policy advocates, and anyone serious about the hashrate heating industry. This is a technical and practical gathering — not a general crypto conference.

6. **What kind of content will there be?**  
   Talks and presentations, hands-on workshops, live hardware and system demos, networking, meals, and an after-party. Full agenda TBD — speaker lineup and workshop details will be announced closer to the event.

7. **Are product demos featured?**  
   Yes. Live hashrate heating systems have been running on-site at every summit. Interested in demoing at HPS 2027? Email admin@heatpunks.org.

8. **Will sessions be recorded?**  
   We've recorded sessions at every summit so far. Watch HPS 2025 and 2026 recordings on the Education page or via the YouTube playlists. We plan to record HPS 2027 as well.

9. **How do I get from the airport?**  
   The A Line train runs directly from Denver International Airport (DIA) to downtown. The Space is in the RiNo neighborhood — a short rideshare from the 38th & Blake station.

10. **Can I sponsor or demo a product?**  
    Yes. Email admin@heatpunks.org with subject "HPS 2027 Sponsorship" to discuss options.

### 5.12 PastSummitsSection (new component)

Placed after FAQSection, before the page footer.

**Section tag:** `[ARCHIVE]`  
**Header:** `PAST SUMMITS`

Two side-by-side cards:

**HPS 2026 Card:**
- Badge: `SECOND ANNUAL`
- Date: `FEB 27–28, 2026 · DENVER, CO`
- Blurb: The 256 Foundation was announced. FOSS firmware got its mandate. 150+ builders, 6 sponsors, full two-day conference.
- CTA: `VIEW ARCHIVE →` → `/summit/2026`

**HPS 2025 Card:**
- Badge: `INAUGURAL EVENT`
- Date: `DENVER, CO`
- Blurb: "Undermine: Heatpunk Summit 2025" — the first gathering. 150 builders, 10+ demos, 4 sponsors. Where heatpunks.org was born.
- CTA: `VIEW ARCHIVE →` → `/summit/2025`

---

## 6. `/summit/2026` — 2026 Archive Page

Rich standalone archive built from the same data as the current summit page, with added archive treatments.

### 6.1 Architecture

Option: The `app/summit/[year]/page.tsx` dynamic route handles both 2025 and 2026, dispatching to year-specific data. Or: create separate `app/summit/2026/page.tsx` and `app/summit/2025/page.tsx` static files. Given the content difference (2026 has full schedule.yaml; 2025 does not), **separate static pages are cleaner**.

### 6.2 Hero
- "PAST EVENT" pill badge (amber color)
- Headline: `HEATPUNK SUMMIT 2026`
- Dates: `FEB 27–28, 2026 · DENVER, CO`
- Hero image: `/images/summit/2026/hero.png` (thermal image)
- Stat bar: `150+ BUILDERS · 2 DAYS · {X} WORKSHOPS · {X} DEMOS · 6 SPONSORS` (derive workshop/demo counts from schedule.yaml)

### 6.3 Key Milestone Callout (new)

A highlighted callout/banner:
> **Announced at HPS 2026:** The 256 Foundation — a 501(c)(3) nonprofit formed to fund and house the Hashrate Heatpunks community project, including FOSS firmware, open hardware reference designs, and a documented open-source mining pool implementation.

### 6.4 Recap Video
- Embed YouTube ID: `PsRaSv3Y0_k`
- CTA: `WATCH ALL HPS 2026 SESSIONS →` → `https://www.youtube.com/watch?v=4FEwVYIvvSU&list=PLgYVdSZznAdM7JVqScdZcKJ5i4ILABNC4`

### 6.5 Full Schedule
Render from `data/schedule.yaml`. Use existing schedule rendering components. All CTAs (registration, tickets) removed — archive only.

### 6.6 Sponsors
Render from `data/sponsors.yaml` using existing `SponsorGrid`. Header: `HPS 2026 SPONSORS — Thank you.`

### 6.7 Bottom Navigation
- `← BACK TO SUMMIT 2027` → `/summit`
- `VIEW HPS 2025 ARCHIVE →` → `/summit/2025`

---

## 7. `/summit/2025` — 2025 Archive Page

Lighter than 2026 (no schedule.yaml), but real content and "Undermine" era branding.

### 7.1 Hero
- "INAUGURAL EVENT" pill badge
- Headline: `UNDERMINE`
- Subheadline: `HEATPUNK SUMMIT 2025`
- Tagline: `The first gathering. Where it all started.`
- Hero image: `/images/summit/2025/hero.jpg` (UnderMine_Summit.jpg)
- Stat bar: `~150 BUILDERS · 2 DAYS · 10+ LIVE DEMOS · 4 SPONSORS`

### 7.2 Origin Story Section

Short prose section:
> Before the website. Before the forum. Before the 256 Foundation. There was a room full of people who'd never all been in the same place — home miners, firmware hackers, HVAC engineers, heating contractors, and bitcoin true believers.
>
> "Undermine: Heatpunk Summit 2025" was the first time anyone brought them together. The takeaway: we need to be more organized. That conversation led directly to heatpunks.org, the community forum, and everything built since.

### 7.3 Recap Video
- Embed YouTube ID: `c-NrYzmPRv8`
- CTA: `WATCH ALL HPS 2025 SESSIONS →` → `https://www.youtube.com/watch?v=xarEPPMGdxU&list=PLgYVdSZznAdN3scDRRbUktk6quW3RtMgA`

### 7.4 Sponsors
Header: `HPS 2025 SPONSORS — Thank you.`
```
Luxor           https://luxor.tech              /images/summit/2025/sponsor-luxor.webp
Braiins         https://braiins.com             /images/summit/2025/sponsor-braiins.webp
Compass Mining  https://compassmining.io        /images/summit/2025/sponsor-compass.webp
Build a Mine    https://bitcoinminingworld.com  /images/summit/2025/sponsor-bam.webp
```

### 7.5 Bottom Navigation
- `← BACK TO SUMMIT 2027` → `/summit`
- `VIEW HPS 2026 ARCHIVE →` → `/summit/2026`

---

## 8. Education Page Updates

Add a "Past Summits" section or callout **after the existing video sections**:

**Header:** `SUMMIT ARCHIVES`  
**Body:** Missed a summit? Each year's recordings, schedule, and sponsor information are archived on the summit history pages.

Two link cards:
- `HPS 2026 ARCHIVE →` → `/summit/2026`
- `HPS 2025 ARCHIVE →` → `/summit/2025`

---

## 9. Sitewide Audit

Search for and update:

| Find | Replace |
|---|---|
| "REQUEST INVITE" (button text) | "JOIN THE WAITLIST" |
| "Request invite" / "request invite" | "Join the waitlist" |
| `eventStatus: EventCompleted` (main summit JSON-LD) | `EventScheduled` (now on 2027 page) |
| `startDate: '2026-02-27'` (main summit JSON-LD) | `startDate: '2027-02-26'` |
| `endDate: '2026-02-28'` (main summit JSON-LD) | `endDate: '2027-02-27'` |
| Summit 2026 metadata descriptions in `app/summit/page.tsx` | 2027 descriptions |

---

## 10. Implementation Sequence

Recommended order to avoid breaking the live site:

1. Copy assets to `/public/images/summit/2025/` and `/public/images/summit/2026/`
2. Create `data/summit2025.ts` and `data/summit2027.ts`
3. Build `/summit/2025` archive page (currently just a stub — lowest risk to build first)
4. Build `/summit/2026` archive page (move current summit content into archive format)
5. Refactor `/summit` page for 2027 (update sections, remove 2026-specific ones, add new ones)
6. Rename `InvitationModal` → `WaitlistModal` + update copy + add price display
7. Build `SponsorshipSection` component
8. Rewrite `FAQSection` with 2027 content
9. Build `PastSummitsSection` component
10. Update Education page with archive links
11. Sitewide audit — fix remaining stale 2026 references
12. `npx tsc --noEmit && npm run build` — verify clean
13. Test all routes: `/summit`, `/summit/2026`, `/summit/2025`, `/education`

---

## 11. Out of Scope

- No online ticket purchasing or payment processing (waitlist only)
- No sponsor tier packages or sponsor portal
- No 2027 speaker or workshop detail (TBD — handled with "full agenda coming soon" copy)
- No changes to grants, mission, or other pages beyond Education archive links
- No new visual brand assets for 2027 (existing site aesthetic applies)
- No ski day booking integration (mention date and "details TBD")
- No changes to API endpoints or form submission backend

---

## 12. Open Questions (confirm before building)

1. **HPS 2025 exact dates** — The actual month/day of HPS 2025 is not in any data file. What were the exact dates? Needed for the 2025 archive page header.
2. **2025 talk listings** — Should the 2025 archive list individual talk titles (requires manually entering ~10+ entries from the playlist), or just link to the YouTube playlist without listing individual sessions?
3. **Asset source folders in .gitignore** — `2025 Summit Assets/` and `2026 Summit Assets/` at the project root are not served by Next.js (not in `/public`) but they're in the repo. Should they be committed as-is, or moved/cleaned up?
