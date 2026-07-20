# Hashrate Heatpunks Website Architecture

> **Status: historical design document (as-designed architecture, early 2026).**
> This captures the architecture the site was designed to, and is preserved as a design record.
> The high-level shape (Next.js App Router · thin server layer · content-as-data · Docker standalone)
> is still accurate, but some diagrams and file listings reflect the original intent rather than what
> shipped. For the **current** as-built reference, use [CLAUDE.md](CLAUDE.md) and [README.md](README.md);
> for the 2027 summit pivot, use [SPEC-summit-2027.md](SPEC-summit-2027.md).
>
> **Known divergences from what shipped:**
> - **Email/SMTP:** the app uses Nodemailer over **Brevo** SMTP (`smtp-relay.brevo.com`), not Proton Mail
>   (see the diagrams and ADR-004 below). All three forms (contact, grants, summit invitation) send to a
>   single inbox, **admin@heatpunks.org** — the per-purpose contact@ / grants@ / summit@ recipients in the
>   "Email Routing" table were never separated.
> - **No `/api/forum` proxy route** (shown in the top diagram). The Discourse feed is fetched directly
>   server-side in `lib/discourse.ts`.
> - **Summit is now 2027.** ADR-009/-010 and the metadata tables reference "Summit 2026 / Feb 27–28, 2026";
>   that event is now archived at `/summit/2026`, and `/summit` is the 2027 page. See SPEC-summit-2027.md.
>   The summit hero/flow is `Summit2027Hero` + `WaitlistModal` (2027 waitlist).
> - **Components designed but not built as separate files:** `ThemeProvider` (theme is CSS-only per ADR-006,
>   no provider component), `Button.tsx`, `Card.tsx`, `TrackColumns.tsx`, `TextareaWithCounter.tsx` (counter
>   logic is inlined in `GrantsForm`), and `data/navigation.ts`. The actual component tree is documented in
>   CLAUDE.md / README.md.
> - **The grant program is currently paused** via `data/site.ts → grants.open` (gates the form, the API
>   route, and all "apply" CTAs in one flag).

## Overview

This document defines the technical architecture for the Hashrate Heatpunks community website. The site serves as a hub for the hashrate heating community, featuring a landing page with live forum feed, educational resources, a grant application system for the 256 Foundation, and summit event pages with detailed schedules.

**Key Characteristics:**
- Static-first with selective server-side rendering
- Minimal external dependencies
- Self-hosted on Docker/Proxmox
- Maintainable by novice developers

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              BROWSER                                         │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │  Landing │  │Education │  │  Grants  │  │  Summit  │  │ Schedule │      │
│  │   Page   │  │   Page   │  │   Page   │  │  Landing │  │   Page   │      │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘      │
│       │             │             │             │             │             │
│       └─────────────┴─────────────┴─────────────┴─────────────┘             │
│                                   │                                          │
│                    ┌──────────────┴──────────────┐                          │
│                    │      Client Components       │                          │
│                    │  • VideoCarousel             │                          │
│                    │  • ContactForm               │                          │
│                    │  • GrantsForm                │                          │
│                    │  • SessionCard (expand)      │                          │
│                    │  • AddToCalendar             │                          │
│                    │  • MobileNav                 │                          │
│                    └──────────────────────────────┘                          │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ HTTPS
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           NEXT.JS SERVER                                     │
│                         (Docker Container)                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                        APP ROUTER (/app)                             │    │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                  │    │
│  │  │   layout    │  │    page     │  │  [dynamic]  │                  │    │
│  │  │  (Server)   │  │  (Server)   │  │   routes    │                  │    │
│  │  └─────────────┘  └─────────────┘  └─────────────┘                  │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                        API ROUTES (/app/api)                         │    │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐      │    │
│  │  │  /api/contact   │  │  /api/grants    │  │   /api/forum    │      │    │
│  │  │  (SMTP send)    │  │  (SMTP send)    │  │ (Discourse proxy)│      │    │
│  │  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘      │    │
│  └───────────┼────────────────────┼────────────────────┼───────────────┘    │
│              │                    │                                          │
│  ┌───────────┼────────────────────┼────────────────────────────────────┐    │
│  │           │       LIB LAYER    │                                     │    │
│  │  ┌────────▼────────┐  ┌────────▼────────┐  ┌─────────────────┐      │    │
│  │  │    email.ts     │  │  discourse.ts   │  │   calendar.ts   │      │    │
│  │  │  (nodemailer)   │  │ (fetch + cache) │  │ (ICS generator) │      │    │
│  │  └─────────────────┘  └─────────────────┘  └─────────────────┘      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                        DATA LAYER (/data)                            │    │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐      │    │
│  │  │  schedule.yaml  │  │  sponsors.yaml  │  │    videos.ts    │      │    │
│  │  └─────────────────┘  └─────────────────┘  └─────────────────┘      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
          │                         │
          │ SMTP                    │ HTTPS
          ▼                         ▼
┌──────────────────┐    ┌──────────────────────────┐    ┌──────────────────┐
│   Proton Mail    │    │   Discourse Forum        │    │     YouTube      │
│   SMTP Server    │    │ forum.heatpunks.org      │    │   (embeds)       │
└──────────────────┘    └──────────────────────────┘    └──────────────────┘
```

---

## Component Architecture

### Rendering Strategy

```
┌─────────────────────────────────────────────────────────────────┐
│                    SERVER COMPONENTS (Default)                   │
│  - Layout, Header, Footer                                        │
│  - Page content sections                                         │
│  - ForumFeed (fetches on server)                                │
│  - ScheduleDay (static from YAML)                               │
│  - SponsorGrid, Map                                             │
│  - SEO metadata generation                                       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ Props / Children
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    CLIENT COMPONENTS ('use client')              │
│  - VideoCarousel (state: current video, expanded)               │
│  - ContactForm (state: form fields, submission)                 │
│  - GrantsForm (state: form fields, char counts, submission)     │
│  - SessionCard (state: expanded/collapsed)                      │
│  - AddToCalendar (state: dropdown open)                         │
│  - MobileNav (state: menu open)                                 │
│  - ThemeProvider (system preference detection)                  │
│  - FAQ Accordion (state: open items)                            │
└─────────────────────────────────────────────────────────────────┘
```

### Component Hierarchy

```
RootLayout
├── ThemeProvider (client)
├── Header
│   ├── Logo
│   ├── NavLinks (desktop)
│   └── MobileNav (client)
├── {children} ─────────────────────────────────────────────┐
│                                                            │
│   Landing Page                                             │
│   ├── HeroSection                                          │
│   ├── ForumFeedSection                                     │
│   │   └── ForumTopicCard[]                                │
│   ├── LinksSection                                         │
│   ├── ContactSection                                       │
│   │   └── ContactForm (client)                            │
│   └── Footer                                               │
│                                                            │
│   Education Page                                           │
│   ├── HeroSection                                          │
│   ├── BookSection                                          │
│   ├── VideoSection                                         │
│   │   ├── FeaturedVideo                                   │
│   │   └── VideoCarousel (client)                          │
│   └── ComingSoonSection                                    │
│                                                            │
│   Grants Page                                              │
│   ├── HeroSection                                          │
│   ├── WhySection                                           │
│   ├── CategoriesSection                                    │
│   │   └── CategoryCard[]                                  │
│   ├── ApplicationSection                                   │
│   │   └── GrantsForm (client)                             │
│   │       ├── TextInput[]                                 │
│   │       ├── TextareaWithCounter[]                       │
│   │       ├── CategoryDropdown                            │
│   │       └── CheckboxGroup[]                             │
│   ├── FAQSection                                           │
│   │   └── FAQAccordion (client)                           │
│   ├── DonateSection                                        │
│   └── ContactSection                                       │
│                                                            │
│   Summit Landing                                           │
│   ├── HeroSection                                          │
│   ├── AboutSection                                         │
│   ├── TopicsSection                                        │
│   ├── VideoSection                                         │
│   │   └── VideoCarousel (client)                          │
│   ├── VenueSection                                         │
│   │   └── Map                                             │
│   ├── SponsorsSection                                      │
│   │   └── SponsorGrid                                     │
│   ├── FAQSection                                           │
│   │   └── FAQAccordion (client)                           │
│   └── CTASection                                           │
│                                                            │
│   Schedule Page                                            │
│   ├── ScheduleHeader                                       │
│   │   └── AddToCalendar (client) [full event]             │
│   ├── DayTabs (client)                                     │
│   └── ScheduleDay[]                                        │
│       └── SessionCard[] (client)                          │
│           └── AddToCalendar (client) [per session]        │
│                                                            │
└── Footer
```

---

## Data Flow

### Forum Feed Flow

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Browser    │────▶│  Next.js     │────▶│  /lib/       │────▶│  Discourse   │
│   Request    │     │  Server      │     │  discourse   │     │  API         │
└──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
                            │                    │
                            │              ┌─────┴─────┐
                            │              │   Cache   │
                            │              │ (5 min)   │
                            │              └───────────┘
                            ▼
                     ┌──────────────┐
                     │  Render      │
                     │  ForumFeed   │
                     │  Component   │
                     └──────────────┘
                            │
                     ┌──────┴──────┐
                     │   Error?    │
                     └──────┬──────┘
                      Yes   │   No
                       ▼    │    ▼
                  Hide      │   Render
                  Section   │   Topics
```

### Contact Form Flow

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  User fills  │────▶│  ContactForm │────▶│  /api/       │────▶│  /lib/       │
│  form        │     │  (client)    │     │  contact     │     │  email       │
└──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
                            │                                         │
                            │                                         ▼
                            │                                  ┌──────────────┐
                            │                                  │  Proton SMTP │
                            │                                  └──────────────┘
                            │                                         │
                            │◀────────────────────────────────────────┘
                            │         Success/Error Response
                            ▼
                     ┌──────────────┐
                     │  Show        │
                     │  Feedback    │
                     └──────────────┘
```

### Grant Application Flow

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Applicant   │────▶│  GrantsForm  │────▶│  /api/       │────▶│  /lib/       │
│  fills form  │     │  (client)    │     │  grants      │     │  email       │
└──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
       │                    │                                         │
       │                    │                                         ▼
       │             ┌──────┴──────┐                           ┌──────────────┐
       │             │  Validate   │                           │  Proton SMTP │
       │             │  • Required │                           │  ────────────│
       │             │  • Char lim │                           │   TO: grants@│
       │             │  • Checkbox │                           │   heatpunks  │
       │             └─────────────┘                           │   .org       │
       │                    │                                  └──────────────┘
       │                    │                                         │
       │                    │◀────────────────────────────────────────┘
       │                    │         Success/Error Response
       │                    ▼
       │             ┌──────────────┐
       │             │  Show        │
       │             │  Success     │
       │             │  Message     │
       │             └──────────────┘
       │
       └──── Real-time character counter updates (client-side)

Form Fields:
• name, email, organization, country (text)
• category (dropdown: 5 categories + "Other")
• project_title, project_description (3000 char limit)
• budget (number, USD)
• timeline, impact, background (3000 char limit each)
• references, source (optional text)
• 5 acknowledgement checkboxes (all required)
```

### Summit Invitation Flow

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  User clicks │────▶│ Invitation   │────▶│  /api/       │────▶│  /lib/       │
│  "Request    │     │ Modal        │     │  summit-     │     │  email       │
│  Invitation" │     │ (client)     │     │  invitation  │     │              │
└──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
                            │                                         │
                            │                                         ▼
                     ┌──────┴──────┐                           ┌──────────────┐
                     │  Validate   │                           │  Proton SMTP │
                     │  • Name     │                           │  ────────────│
                     │  • Email    │                           │  TO: summit@ │
                     │  • Company  │                           │   heatpunks  │
                     │  • Industry │                           │   .org       │
                     │  • Why      │                           └──────────────┘
                     │  • Contrib  │                                  │
                     └─────────────┘                                  │
                            │                                         │
                            │◀────────────────────────────────────────┘
                            │         Success/Error Response
                            ▼
                     ┌──────────────┐
                     │  Show        │
                     │  Success     │
                     │  Message     │
                     └──────────────┘

Form Fields:
• name, email, company (text, required)
• industryFocus (dropdown: Bitcoin Mining, HVAC/Heating, Both, Other)
• whyAttend (textarea, required)
• contribution (textarea, required)
```

### Email Routing

| Form | Destination | Subject Pattern |
|------|-------------|-----------------|
| Contact | contact@heatpunks.org | [Heatpunks Contact] Message from {name} |
| Grants | grants@heatpunks.org | [Heatpunks Grant] {category} - {projectTitle} |
| Summit Invitation | summit@heatpunks.org | [Summit 2026] Invitation Request - {name} ({company}) |

### Schedule Data Flow

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Build Time  │────▶│  Read YAML   │────▶│  Parse &     │
│              │     │  /data/      │     │  Validate    │
└──────────────┘     └──────────────┘     └──────────────┘
                                                │
                                                ▼
                                         ┌──────────────┐
                                         │  Generate    │
                                         │  Static      │
                                         │  Pages       │
                                         └──────────────┘
                                                │
                     ┌──────────────────────────┼──────────────────────────┐
                     ▼                          ▼                          ▼
              ┌──────────────┐           ┌──────────────┐           ┌──────────────┐
              │ /summit      │           │ /summit/     │           │ /summit/     │
              │              │           │ schedule     │           │ [year]       │
              └──────────────┘           └──────────────┘           └──────────────┘
```

---

## Key Design Decisions

### ADR-001: Server Components as Default

**Context:** Next.js 14+ App Router supports React Server Components (RSC).

**Decision:** Use Server Components by default, Client Components only for interactivity.

**Rationale:**
- Smaller client bundle (no JS shipped for static content)
- Better SEO (content rendered on server)
- Simpler data fetching (no useEffect/useState for server data)
- Matches the static-first nature of the site

**Consequences:**
- Need to explicitly mark interactive components with 'use client'
- Cannot use hooks in Server Components
- Props passed to Client Components must be serializable

---

### ADR-002: YAML for Schedule Data

**Context:** Schedule data needs to be easily editable by non-developers.

**Decision:** Store schedule in a single YAML file, parsed at build time.

**Options Considered:**
1. **JSON file** - Less readable, harder to edit
2. **Markdown with frontmatter** - Good for articles, overkill for structured data
3. **YAML file** - Human-readable, widely understood
4. **Database** - Rejected per spec (no database)

**Rationale:**
- YAML is more readable than JSON for non-developers
- Single file easier to manage than multiple markdown files
- Build-time parsing means no runtime YAML overhead

**Library Choice:** `yaml` package (modern, TypeScript support, small footprint)

---

### ADR-003: Next.js Fetch Caching for Forum Feed

**Context:** Forum feed needs 5-minute cache to avoid hammering Discourse API.

**Decision:** Use Next.js native fetch with `revalidate` option.

**Options Considered:**
1. **Next.js fetch cache** - Built-in, automatic, simple
2. **unstable_cache** - More control, but unstable API
3. **In-memory cache** - Manual implementation, doesn't survive cold starts
4. **Redis** - Overkill, adds infrastructure

**Implementation:**
```typescript
const response = await fetch(discourseUrl, {
  next: { revalidate: 300 } // 5 minutes
});
```

**Rationale:**
- Zero additional dependencies
- Works with Next.js deployment patterns
- Automatic revalidation in the background

---

### ADR-004: Nodemailer for SMTP

**Context:** Contact form needs to send emails via Proton Mail SMTP.

**Decision:** Use Nodemailer with direct SMTP connection.

**Options Considered:**
1. **Nodemailer** - Industry standard, works with any SMTP
2. **SendGrid/Mailgun SDK** - Requires external service account
3. **Resend** - Modern, but another service dependency

**Rationale:**
- Works directly with Proton Mail SMTP
- No additional service dependencies
- Well-documented, stable library

---

### ADR-005: Docker Multi-Stage Build

**Context:** Self-hosted on Proxmox, need efficient container.

**Decision:** Multi-stage Docker build with Node 20 LTS.

**Build Stages:**
1. **deps** - Install dependencies
2. **builder** - Build Next.js application
3. **runner** - Production image with only necessary files

**Rationale:**
- Final image ~150MB vs ~800MB with single stage
- Node 20 LTS for stability and long-term support
- Standalone output mode for smallest possible production build

---

### ADR-006: System Theme Preference

**Context:** Site should support dark/light mode.

**Decision:** Follow system preference with CSS media queries, no toggle.

**Implementation:**
```css
@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}
```

**Rationale:**
- No JavaScript required for initial theme
- No flash of wrong theme on load
- Simpler implementation (no state, no localStorage)
- User's OS preference is respected automatically

---

### ADR-007: Grant Application Form Architecture

**Context:** The grants page requires a comprehensive application form with 13 fields, character limits, and multiple validation rules.

**Decision:** Build a client-side form component with real-time validation, mirroring the contact form pattern with a dedicated `/api/grants` route.

**Options Considered:**
1. **Client-side form with API route** - Mirror contact form, validate client-side, send via SMTP
2. **Multi-step wizard** - Break form into sections, save progress
3. **External form service** - Typeform, Google Forms, etc.

**Rationale:**
- Single-page form is simpler and spec requires no save draft feature
- Real-time character counters need client-side state
- Consistent with existing contact form architecture
- No external service dependencies

**Implementation Details:**
- Form state managed with useState (13 fields + 5 checkboxes)
- Character counters for 4 textarea fields (3000 char limit each)
- Client-side validation before submission
- API route formats data into readable email
- Email sent to grants@heatpunks.org via same SMTP setup

**Form Validation Rules:**
- Required fields: name, email, country, category, project_title, project_description, budget, timeline, impact, background
- All 5 acknowledgement checkboxes must be checked
- Character limits enforced client-side (hard limit, can't exceed)
- Email format validation
- Budget must be positive number

---

### ADR-008: ICS Generation Strategy

**Context:** Add-to-calendar needs to support Google, Apple, and .ics download.

**Decision:** Generate ICS files client-side using `ics` library, construct Google/Apple URLs dynamically.

**Implementation:**
- **Google Calendar:** URL construction with query params
- **Apple Calendar:** Data URL with ICS content
- **.ics Download:** Blob download with generated ICS

**Rationale:**
- No server-side generation needed
- Works offline after initial page load
- Small library footprint (~5KB gzipped)

---

## File Structure (Detailed)

```
/heatpunk-website
├── /app                           # Next.js App Router
│   ├── layout.tsx                 # Root layout (Server)
│   ├── page.tsx                   # Landing page (Server)
│   ├── globals.css                # Global styles + Tailwind
│   ├── /education
│   │   └── page.tsx               # Education page (Server)
│   ├── /grants
│   │   └── page.tsx               # Grants page (Server)
│   ├── /mission
│   │   └── page.tsx               # Mission page (Server)
│   ├── /summit
│   │   ├── page.tsx               # Current summit (Server)
│   │   ├── /schedule
│   │   │   └── page.tsx           # Schedule page (Server)
│   │   └── /[year]
│   │       └── page.tsx           # Archived summit (Server)
│   ├── /api
│   │   ├── /contact
│   │   │   └── route.ts           # POST: send contact email
│   │   ├── /grants
│   │   │   └── route.ts           # POST: send grant application
│   │   ├── /summit-invitation
│   │   │   └── route.ts           # POST: send summit invitation request
│   │   └── /og
│   │       └── route.tsx          # GET: generate OG image
│   └── sitemap.ts                 # Auto-generated sitemap
│
├── /components
│   ├── /layout
│   │   ├── Header.tsx             # Server
│   │   ├── Footer.tsx             # Server
│   │   ├── MobileNav.tsx          # Client
│   │   └── ThemeProvider.tsx      # Client
│   ├── /landing
│   │   ├── HeroSection.tsx        # Server
│   │   ├── ForumFeed.tsx          # Server
│   │   ├── ForumTopicCard.tsx     # Server
│   │   ├── LinksSection.tsx       # Server
│   │   └── ContactForm.tsx        # Client
│   ├── /education
│   │   ├── BookSection.tsx        # Server
│   │   └── VideoSection.tsx       # Server
│   ├── /grants
│   │   ├── HeroSection.tsx        # Server
│   │   ├── WhySection.tsx         # Server
│   │   ├── CategoriesSection.tsx  # Server
│   │   ├── CategoryCard.tsx       # Server
│   │   ├── ApplicationSection.tsx # Server
│   │   ├── GrantsForm.tsx         # Client (form state, validation)
│   │   ├── TextareaWithCounter.tsx# Client (char count state)
│   │   ├── FAQSection.tsx         # Server
│   │   ├── DonateSection.tsx      # Server
│   │   └── ContactSection.tsx     # Server
│   ├── /summit
│   │   ├── SummitHero.tsx         # Client (modal state)
│   │   ├── InvitationModal.tsx    # Client (form state, validation)
│   │   ├── AboutSection.tsx       # Server
│   │   ├── VenueSection.tsx       # Server
│   │   ├── Map.tsx                # Server (iframe)
│   │   ├── SponsorGrid.tsx        # Server
│   │   └── FAQAccordion.tsx       # Client
│   ├── /schedule
│   │   ├── ScheduleHeader.tsx     # Server
│   │   ├── DayTabs.tsx            # Client
│   │   ├── ScheduleDay.tsx        # Server
│   │   ├── SessionCard.tsx        # Client
│   │   └── TrackColumns.tsx       # Server
│   └── /shared
│       ├── VideoCarousel.tsx      # Client
│       ├── VideoEmbed.tsx         # Server (iframe wrapper)
│       ├── AddToCalendar.tsx      # Client
│       ├── Button.tsx             # Server
│       ├── Card.tsx               # Server
│       └── SkeletonCard.tsx       # Server
│
├── /lib
│   ├── discourse.ts               # Forum API client
│   ├── email.ts                   # Nodemailer wrapper
│   ├── calendar.ts                # ICS generation
│   ├── schedule.ts                # YAML loader & types
│   └── utils.ts                   # Shared utilities
│
├── /data
│   ├── schedule.yaml              # Summit schedule
│   ├── sponsors.yaml              # Sponsor data
│   ├── videos.ts                  # Hardcoded video data
│   ├── grants.ts                  # Grant categories & FAQ data
│   ├── navigation.ts              # Nav links config
│   └── site.ts                    # Site metadata
│
├── /content
│   └── /education                 # Future markdown articles
│       └── .gitkeep
│
├── /public
│   ├── /images
│   │   ├── logo.svg
│   │   ├── logo-dark.svg
│   │   └── /sponsors
│   │       ├── canaan.png
│   │       ├── compass.png
│   │       └── ...
│   └── /resources
│       └── bitcoin-mining-heat-reuse.pdf
│
├── /types
│   ├── schedule.ts                # Schedule type definitions
│   ├── discourse.ts               # Forum API types
│   ├── grants.ts                  # Grant application types
│   └── index.ts                   # Re-exports
│
├── .env.example                   # Environment template
├── .env.local                     # Local env (gitignored)
├── Dockerfile                     # Multi-stage build
├── docker-compose.yml             # Local development
├── next.config.js                 # Next.js configuration
├── tailwind.config.js             # Tailwind configuration
├── tsconfig.json                  # TypeScript configuration
├── package.json
├── SPEC.md                        # Requirements specification
└── ARCHITECTURE.md                # This document
```

---

## Implementation Phases

### Phase 1: Foundation
1. Initialize Next.js project with TypeScript
2. Configure Tailwind CSS with brand colors
3. Set up Docker configuration
4. Create root layout with theme support
5. Implement Header and Footer components
6. Set up environment variables structure

### Phase 2: Landing Page
1. Build Hero section with CTAs
2. Implement ForumFeed with Discourse integration
3. Create Links/Resources section
4. Build Contact form with SMTP integration
5. Add skeleton loading states

### Phase 3: Education Page
1. Create Hero/intro section
2. Build Book section with PDF download
3. Implement VideoCarousel component
4. Add Coming Soon placeholder

### Phase 4: Grants Page
1. Create grants page structure with all sections
2. Build Hero section with "Build with us" messaging
3. Create Why section explaining industry challenges
4. Build Categories grid with 5 category cards
5. Implement GrantsForm component:
   - Form state management (13 fields + 5 checkboxes)
   - TextareaWithCounter component for char limits
   - Client-side validation
   - Category dropdown
   - Checkbox group for acknowledgements
6. Create `/api/grants` route:
   - Validate submission
   - Format data into readable email
   - Send to grants@heatpunks.org via SMTP
7. Add FAQ section (reuse FAQAccordion component)
8. Build Donate CTA section (link to 256foundation.org)
9. Add Contact section with grants@heatpunks.org
10. Update navigation to include Grants link

### Phase 5: Summit Pages
1. Build Summit landing page structure
2. Implement all sections (Hero, About, Topics, etc.)
3. Create SponsorGrid component
4. Add OpenStreetMap embed
5. Build FAQ accordion

### Phase 6: Schedule System
1. Define YAML schema and types
2. Create YAML parsing utilities
3. Build ScheduleDay component
4. Implement SessionCard with expand/collapse
5. Add parallel session column layout
6. Implement AddToCalendar functionality

### Phase 7: SEO & Polish
1. Add meta tags to all pages
2. Implement OG image generation
3. Create sitemap.ts
4. Add Umami analytics script
5. Accessibility audit and fixes

### Phase 8: Deployment
1. Finalize Dockerfile
2. Test Docker build locally
3. Configure DNS redirects
4. Deploy to Proxmox
5. Verify all functionality

---

## Type Definitions

### Schedule Types

```typescript
// /types/schedule.ts

export type SessionType =
  | 'talk'
  | 'workshop'
  | 'panel'
  | 'demo'
  | 'break'
  | 'social';

export interface Session {
  id: string;
  title: string;
  type: SessionType;
  start: string;        // HH:mm format
  end: string;          // HH:mm format
  speakers?: string[];
  description?: string;
  location?: string;
  track?: 'main' | 'breakout';
}

export interface ScheduleDay {
  date: string;         // YYYY-MM-DD format
  name: string;
  sessions: Session[];
}

export interface Summit {
  year: number;
  dates: {
    pre_summit: string;
    day1: string;
    day2: string;
  };
  venue: {
    name: string;
    address: string;
    timezone: string;
  };
}

export interface ScheduleData {
  summit: Summit;
  days: ScheduleDay[];
}
```

### Grant Application Types

```typescript
// /types/grants.ts

export type GrantCategory =
  | 'technical-standards'
  | 'academic-research'
  | 'regulatory-advocacy'
  | 'case-studies'
  | 'educational-content'
  | 'other';

export interface GrantApplication {
  // Contact Info
  name: string;
  email: string;
  organization?: string;       // Optional
  country: string;

  // Project Details
  category: GrantCategory;
  projectTitle: string;
  projectDescription: string;  // 3000 char limit
  budget: number;              // USD amount
  timeline: string;            // 3000 char limit

  // Impact & Background
  impact: string;              // 3000 char limit
  background: string;          // 3000 char limit

  // Optional
  references?: string;
  source?: string;             // How did you hear about us

  // Acknowledgements (all must be true)
  ackBitcoin: boolean;
  ackOpenLicense: boolean;
  ackPublicShare: boolean;
  ackNoGuarantee: boolean;
  ackContact: boolean;
}

export interface GrantCategory {
  id: GrantCategory;
  name: string;
  description: string;
}

export interface GrantFAQ {
  question: string;
  answer: string;
}

// Character limit constant
export const GRANT_CHAR_LIMIT = 3000;
```

### Discourse Types

```typescript
// /types/discourse.ts

export interface DiscourseUser {
  id: number;
  username: string;
  avatar_template: string;
}

export interface DiscourseTopic {
  id: number;
  title: string;
  fancy_title: string;
  slug: string;
  excerpt?: string;
  created_at: string;
  last_posted_at: string;
  category_id: number;
  category_name?: string;
  posts_count: number;
  reply_count: number;
  posters: Array<{
    user_id: number;
  }>;
}

export interface DiscourseLatestResponse {
  users: DiscourseUser[];
  topic_list: {
    topics: DiscourseTopic[];
  };
}

export interface ForumTopic {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  url: string;
  timeAgo: string;
}
```

---

## Environment Configuration

```bash
# .env.example

# ─────────────────────────────────────
# Discourse Forum
# ─────────────────────────────────────
DISCOURSE_URL=https://forum.heatpunks.org
# Optional: Only needed if forum requires authentication
DISCOURSE_API_KEY=
DISCOURSE_API_USERNAME=

# ─────────────────────────────────────
# Email (Proton Mail SMTP)
# ─────────────────────────────────────
SMTP_HOST=smtp.protonmail.ch
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=admin@heatpunks.org
SMTP_PASS=

# Email recipients (routed to specific inboxes)
CONTACT_EMAIL=contact@heatpunks.org
GRANTS_EMAIL=grants@heatpunks.org
SUMMIT_EMAIL=summit@heatpunks.org

# ─────────────────────────────────────
# Umami Analytics
# ─────────────────────────────────────
NEXT_PUBLIC_UMAMI_WEBSITE_ID=
NEXT_PUBLIC_UMAMI_URL=

# ─────────────────────────────────────
# Site Configuration
# ─────────────────────────────────────
NEXT_PUBLIC_SITE_URL=https://heatpunks.org
```

---

## Docker Configuration

```dockerfile
# Dockerfile

# ─────────────────────────────────────
# Stage 1: Dependencies
# ─────────────────────────────────────
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# ─────────────────────────────────────
# Stage 2: Builder
# ─────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# ─────────────────────────────────────
# Stage 3: Runner
# ─────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

```yaml
# docker-compose.yml

version: '3.8'

services:
  web:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    env_file:
      - .env.local
    restart: unless-stopped
```

---

## Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Discourse API changes | Low | Medium | Abstract API calls in `/lib/discourse.ts`, easy to update |
| Proton SMTP rate limits | Low | Medium | Contact/grants forms have no spam protection; add honeypot if issues arise |
| Grant application spam | Medium | Medium | No spam protection per spec; can add honeypot field if abuse occurs |
| Large grant email formatting | Low | Low | Email template tested with max char limits; plain text fallback |
| YAML parse errors | Medium | High | Validate YAML at build time, fail fast with clear error messages |
| Large schedule data | Low | Low | YAML is read once at build time, cached in static pages |
| OG image generation fails | Low | Low | Fallback to static default OG image |
| YouTube embed blocked | Low | Low | Use youtube-nocookie.com domain for privacy-friendly embeds |
| Theme flash on load | Medium | Low | CSS-only theme switching avoids hydration mismatch |

---

## Performance Considerations

### Build-Time Optimization
- All schedule pages generated statically at build time
- YAML parsed once, not on every request
- Images optimized via Next.js Image component

### Runtime Optimization
- Server Components reduce client JS bundle
- Forum feed cached for 5 minutes (server-side)
- Lazy load video embeds (intersection observer)
- Lazy load below-fold components

### Bundle Size Targets
- First Load JS: < 100KB
- Per-route JS: < 30KB
- Total CSS: < 50KB

---

## Security Considerations

### Input Validation
- Contact form: validate email format, sanitize message content
- Grants form: validate all required fields, enforce character limits, validate email format
- Summit invitation form: validate required fields, sanitize all inputs
- No user-generated content displayed (XSS not a concern for forum titles)

### API Routes
- `/api/contact`: Rate limiting recommended if spam becomes an issue
- `/api/grants`: Same SMTP infrastructure; validate all fields server-side before sending
- `/api/summit-invitation`: Same SMTP infrastructure; validate required fields
- No authentication required (no user accounts)

### Environment Variables
- Sensitive values (SMTP password) never exposed to client
- Only `NEXT_PUBLIC_*` vars available in browser

### Headers
- Configure security headers in `next.config.js`:
  - X-Content-Type-Options: nosniff
  - X-Frame-Options: SAMEORIGIN
  - Referrer-Policy: origin-when-cross-origin

---

## SEO & Social Architecture

### ADR-009: Dynamic OG Image Generation

**Context:** Each page needs unique, branded OpenGraph images for social sharing.

**Decision:** Use Next.js Edge Runtime with `ImageResponse` for dynamic OG generation.

**Implementation:**
- `/app/api/og/route.tsx` - Edge function generating 1200x630 PNG
- Query params: `title`, `subtitle`, `page` (for page-specific styling)
- Page-specific styles: home (branded), summit (event poster), grants (funding theme)

**Dynamic Summit OG Logic:**
```
Event Date: Feb 27-28, 2026

if (currentDate < eventStart) → "FEB 27-28, 2026 • REQUEST INVITATION"
if (currentDate >= eventStart && currentDate <= eventEnd) → "HAPPENING NOW • DENVER, CO"
if (currentDate > eventEnd) → "SUMMIT 2026 COMPLETE • WATCH RECAP"
```

---

### ADR-010: JSON-LD Structured Data

**Context:** Search engines need structured data for rich snippets.

**Decision:** Embed JSON-LD in layout and page components.

**Schemas:**
1. **Organization** (global in layout.tsx)
   - Name: "Hashrate Heatpunks"
   - Parent: "256 Foundation"
   - Location: Denver, CO
   - Social links: Twitter, Forum

2. **Event** (summit/page.tsx)
   - Heatpunk Summit 2026
   - Dates: Feb 27-28, 2026
   - Location: Denver, CO

3. **FAQPage** (grants/page.tsx)
   - Grant program FAQ items

**Implementation:**
```tsx
// In layout.tsx (Organization schema)
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Hashrate Heatpunks",
      // ... rest of schema
    })
  }}
/>
```

---

### Metadata Strategy

| Page | Title | Description | OG Image Style |
|------|-------|-------------|---------------|
| `/` | Hashrate Heatpunks | Join a community of builders turning Bitcoin mining heat into sustainable home heating solutions. | Branded + tagline |
| `/mission` | Mission \| Hashrate Heatpunks | Our mission: make hashrate heating accessible to everyone. | Mission theme |
| `/education` | Resources \| Hashrate Heatpunks | DIY guides and tutorials for building Bitcoin mining heaters. | DIY/Tutorial |
| `/grants` | Grants \| Hashrate Heatpunks | Apply for grants to support hashrate heating projects. | Funding theme |
| `/summit` | Summit 2026 \| Hashrate Heatpunks | Heatpunk Summit 2026 - February 27-28 in Denver, CO. | Event poster (dynamic) |
| `/summit/schedule` | Summit Schedule \| Hashrate Heatpunks | Full schedule for Heatpunk Summit 2026. | Event poster |

---

### Twitter Configuration

- Card type: `summary_large_image`
- Site handle: `@HashHeatpunks`
- Creator handle: `@HashHeatpunks`

---

### Sitemap Configuration

| URL | Priority | Change Frequency |
|-----|----------|------------------|
| `/` | 1.0 | weekly |
| `/mission` | 0.9 | monthly |
| `/education` | 0.8 | monthly |
| `/grants` | 0.9 | monthly |
| `/summit` | 0.9 | weekly |
| `/summit/schedule` | 0.8 | weekly |

---

## References

- **Specification:** [SPEC.md](./SPEC.md)
- **Next.js App Router:** https://nextjs.org/docs/app
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Discourse API:** https://docs.discourse.org/
