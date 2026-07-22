# Hashrate Heatpunks Website Specification

> **Status: historical design document (original pre-launch spec, early 2026).**
> This is the requirements spec the site was originally built from. It is preserved as a
> record of intent — much of it still holds, but the site has since shipped and evolved.
> For the **current** state, treat these as authoritative instead:
> - [SPEC-summit-2027.md](SPEC-summit-2027.md) — the 2027 summit pivot (supersedes all "Summit 2026" content below)
> - [CLAUDE.md](CLAUDE.md) and [README.md](README.md) — the as-built stack, routes, and where content lives
> - [ARCHITECTURE.md](ARCHITECTURE.md) — the design/architecture record (also carries a divergence note)
>
> **Known divergences from what shipped** (the body below is otherwise broadly accurate):
> - **Summit is now 2027.** `/summit` is the forward-looking 2027 page (Feb 26–27, Denver); 2025 and
>   2026 are rich archive pages at `/summit/2025` and `/summit/2026`. `/summit/[year]` still exists as a
>   generic fallback but its `archivedYears` list is empty, so it 404s for every year. All "Summit 2026 /
>   Feb 27–28, 2026" copy below describes what is now the 2026 archive.
> - **The grant program is currently paused.** `data/site.ts → grants.open` gates the application form,
>   the `/api/grants` route, and every "apply" CTA in one flag; while closed the page points to donations.
> - **No server-side email backend.** The Brevo/Nodemailer SMTP design below was removed entirely —
>   `lib/email.ts`, `/api/contact`, and `/api/summit-invitation` no longer exist. `ContactForm` and
>   `WaitlistModal` now POST directly to Web3Forms from the browser (with an embedded hCaptcha widget),
>   which routes notifications to **tyler@256foundation.org** per its own dashboard config, not this repo.
> - **No `/forum` redirect page and no `/api/forum` proxy route** exist. The forum feed is fetched
>   server-side in `lib/discourse.ts`; the forum is otherwise linked directly to forum.heatpunks.org.
> - **No `summit.heatpunks.org` DNS redirect** is part of this repo.
> - The summit uses a **waitlist** flow (`WaitlistModal`) for 2027 alongside the invitation modal.

## Overview

A community website for Hashrate Heatpunks - a community of bitcoiners and heating industry specialists advancing the hashrate heating industry (using bitcoin miners as heating appliances across residential, commercial, industrial, and district scales).

**Domain:** heatpunks.org
**Tagline:** "A community working on the emerging hashrate heating industry - Marrying the bitcoin mining and heating sectors to bring hashrate back to homes and businesses"

**Project managed under:** 256 Foundation (501c3 nonprofit, mission: "dismantling the proprietary mining empire")

---

## Technical Architecture

### Stack
- **Framework:** Next.js
- **Styling:** Tailwind CSS
- **Hosting:** Self-hosted Docker container on Proxmox server
- **Deployment:** Manual Docker rebuild on git push

### Routing Strategy
- Path-based routing for all pages
- `summit.heatpunks.org` → DNS redirect to `heatpunks.org/summit`
- `forum.heatpunks.org` → Separate Discourse instance (managed independently)

### Data Management
- Schedule data: Single YAML file (`/data/schedule.yaml`)
- Video data: Hardcoded in component (update manually as needed)
- Sponsor data: YAML file with logo paths and URLs
- Education articles: Markdown files with frontmatter (for future content)

---

## Site Structure

### Pages

1. **Landing Page** (`/`)
2. **Education Page** (`/education`)
3. **Grants Page** (`/grants`)
4. **Summit Landing Page** (`/summit`)
5. **Summit Schedule Page** (`/summit/schedule`)
6. **Archived Summit Pages** (`/summit/[year]`) - for past summits

---

## Page Specifications

### 1. Landing Page (`/`)

#### Layout (top to bottom)
1. **Hero Section**
   - Community tagline/headline
   - Three CTAs: Join Community (Telegram), Learn (Education), Attend Summit
   - Background: styled with brand colors (orange/fire tones)

2. **Forum Feed Section**
   - Live feed of 5-10 recent Discourse topics
   - Each topic shows: Title, short excerpt, category, time ago
   - Server-side fetching with 5-minute cache
   - Skeleton card loading state
   - Hides section entirely if Discourse API fails
   - Link to full forum at bottom

3. **Links/Resources Section**
   - Social links: Telegram (t.me/heatpunks), X (@HashHeatpunks), Forum
   - 256 Foundation attribution with links to 256foundation.org and github.com/256foundation

4. **Contact Form Section**
   - Fields: Name (required), Email (required), Message (required)
   - Submits to Next.js API route → sends via Proton Mail SMTP
   - Success/error feedback after submission
   - No spam protection initially

5. **Footer**
   - 256 Foundation project attribution
   - Links to 256foundation.org and GitHub
   - Social links
   - Copyright notice

#### Discourse API Integration
```
Endpoint: [forum.heatpunks.org]/latest.json
Fallback: Try with API key if public access fails
Cache: 5 minutes server-side
Display: 5-10 topics with title, excerpt, category, relative time
Error handling: Hide section on failure
```

---

### 2. Education Page (`/education`)

#### Content Sections

1. **Hero/Intro**
   - Brief intro to hashrate heating education resources

2. **Featured Book**
   - Title: "Bitcoin Mining Heat Reuse"
   - Subtitle: "Heat is a Product, Not a Problem"
   - Author: Tyler Stevens
   - PDF download button (file hosted in repo at `/public/resources/`)

3. **Video Section**
   - Featured video: Main embedded YouTube player (2025 summit highlight)
   - Video carousel: 3 visible thumbnails with left/right arrows
   - Click thumbnail → expands inline to play
   - Hardcoded video IDs and titles (manual updates)

4. **Coming Soon Section**
   - Placeholder for future curated articles and tutorials
   - "More resources coming soon" message

#### Future Content Structure
- Markdown files in `/content/education/` directory
- Frontmatter: title, date, author, excerpt, tags
- Rendered as article pages when added

---

### 3. Grants Page (`/grants`)

A page for grant proposals and information about the Heatpunks/256 Foundation grant program to accelerate global hashrate heating adoption.

#### Program Overview

- **Administered by:** 256 Foundation (501c3 nonprofit)
- **Eligibility:** Open to anyone worldwide - individuals, teams, companies, universities, nonprofits
- **Grant amounts:** Case by case, no fixed ranges (applicants specify requested amount in USD)
- **Payment:** Bitcoin only
- **Review process:** Rolling/ongoing (no fixed deadlines)
- **IP requirement:** Funded work must be released under open/permissive license

#### Page Sections (in order)

1. **Hero Section**
   - Headline: "Build with us" collaborative messaging
   - Brief intro to the grants program
   - Primary CTA: "Apply Now" button (scrolls to application form)
   - Background: Consistent heatpunk aesthetic

2. **Why Section - Industry Challenges**
   - Explain why grants matter for hashrate heating adoption
   - Key challenges to address (qualitative, no specific stats):
     - No established safety standards/certifications (UL, CE, etc.)
     - Building codes don't recognize hashrate heating
     - HVAC industry unfamiliar with the technology
     - Need for documented case studies and real-world performance data
   - Global scope emphasized - not US-specific

3. **Grant Categories Grid**
   - Display 5 suggested categories as cards with descriptions
   - Note that these are suggestions, not exhaustive - other categories welcome
   - Categories:
     1. **Technical Standards & Certifications**
        - Work toward safety certifications (UL, CE), ASHRAE standards, building code integration
     2. **Academic Research & Publications**
        - Peer-reviewed research, thermal efficiency studies, ASHRAE publications, academic partnerships
     3. **Regulatory & Policy Advocacy**
        - Building code advocacy, permitting guidance, engagement with officials and policymakers
     4. **Case Studies & Documentation**
        - Document installations, collect performance data, publish findings for industry reference
     5. **Educational Content & Training**
        - Tutorials, training materials, workshops, content for HVAC professionals and builders

4. **Application Form**
   - Form submits via Next.js API route → sends to grants@heatpunks.org via SMTP
   - On-page success message after submission (no auto-confirmation email to applicant)
   - No spam protection
   - No save draft feature - single session completion expected

   **Form Fields:**

   | Field | Type | Required | Notes |
   |-------|------|----------|-------|
   | Full Name | text | Yes | |
   | Email | email | Yes | |
   | Organization | text | No | Company, university, nonprofit, or "Independent" |
   | Country | text | Yes | |
   | Grant Category | dropdown | Yes | 6 options: 5 categories + "Other" |
   | Project Title | text | Yes | |
   | Project Description | textarea | Yes | 3000 character hard limit with counter |
   | Budget Requested | number | Yes | USD amount, no minimum |
   | Timeline | textarea | Yes | 3000 character limit, free text description |
   | Expected Impact & Deliverables | textarea | Yes | 3000 character limit |
   | Applicant Background | textarea | Yes | 3000 character limit |
   | References | textarea | No | Optional, free text for 1-2 references with emails |
   | How did you hear about us? | text | No | |

   **Acknowledgement Checkboxes (all required):**
   - [ ] I understand grants are paid in Bitcoin
   - [ ] I agree to make project deliverables publicly available under an open license
   - [ ] I grant 256 Foundation permission to publicly share information about funded projects
   - [ ] I understand submitting an application does not guarantee funding
   - [ ] I consent to being contacted about my application

   **Success Message:**
   > "Thank you for your application. We review proposals on a rolling basis and will be in touch if we'd like to learn more."

5. **FAQ Section**
   - Expandable accordion (same style as Summit FAQ)
   - 8 questions:

   | Question | Answer |
   |----------|--------|
   | Who can apply? | Anyone - individuals, teams, companies, universities, and nonprofits from anywhere in the world. |
   | Are there geographic restrictions? | No. We welcome applications from anywhere globally. Hashrate heating is a worldwide opportunity. |
   | What categories are funded? | We fund work in technical standards, academic research, regulatory advocacy, case studies, and educational content. These categories are suggestions - we're open to other ideas that advance hashrate heating. |
   | How much can I request? | There are no fixed grant amounts. Request what you need for your project and justify it in your application. |
   | How are grants paid? | All grants are paid in Bitcoin. |
   | What's the review process? | We review applications on a rolling basis. There are no deadlines. If we're interested, we'll reach out to learn more. |
   | Can I apply multiple times? | Yes. There's no limit on the number of proposals you can submit. |
   | What if my proposal is rejected? | You can reapply immediately with a revised or new proposal. |
   | What about intellectual property? | Work funded by these grants must be released under an open/permissive license to benefit the broader community - a necessity to kickstart the industry. |

6. **Support/Donate CTA Section**
   - For people who want to fund the grants program rather than apply
   - Brief text explaining how donations support hashrate heating research
   - CTA button linking to 256foundation.org

7. **Contact Section**
   - Display grants@heatpunks.org for questions about the program
   - Brief text: "Questions about the grants program? Reach out."

#### Technical Notes

- Character counters only shown on fields with limits
- Form validation shows inline errors
- Same accessibility standards as rest of site (WCAG 2.1 AA target)
- Uses semantic CSS variables for light/dark mode support

---

### 4. Summit Landing Page (`/summit`)

This page shows the current/upcoming summit. Past summits archived at `/summit/[year]`.

#### Sections

1. **Hero**
   - Event name: Heatpunk Summit 2026
   - Dates: February 27-28, 2026 (Pre-summit: Feb 26)
   - Location: The Space, Denver, Colorado
   - Primary CTA: Get on Waitlist (mailto:admin@heatpunks.org)

2. **About Section**
   - Event description and purpose
   - Who should attend
   - What to expect

3. **Topics Teaser**
   - Preview of session topics/themes
   - Match style from current denver.space page

4. **Featured Video**
   - Embedded YouTube: 2025 summit highlight video

5. **Past Summit Videos**
   - Carousel of 2025 summit recordings
   - 3 visible + arrows navigation
   - Click to expand inline

6. **Venue & Travel**
   - Address: 3700 N Franklin St, Denver, CO 80205 (RiNo District)
   - Embedded OpenStreetMap
   - Transit note: Accessible via train from DIA

7. **Sponsors**
   - Logo grid (equal sizing)
   - Clickable → opens sponsor site in new tab
   - Current sponsors: Canaan, Compass Mining, Exergy, Human Rights Foundation, Ocean, TESSERE

8. **FAQ**
   - Expandable accordion
   - Placeholder questions (to be filled before launch)

9. **CTA Footer**
   - Repeat waitlist CTA
   - Link to full schedule page

---

### 5. Summit Schedule Page (`/summit/schedule`)

#### Layout

1. **Header**
   - Event dates
   - Add full event to calendar button (downloads entire event .ics)

2. **Day Tabs/Sections**
   - Pre-Summit (Feb 26): Ski Day + Happy Hour
   - Day 1 (Feb 27): Main programming
   - Day 2 (Feb 28): Main programming

3. **Session Cards**
   - Collapsible cards (inspired by bitcoinpark.com/nems/26schedule)
   - Display: Start time - End time, Title, Speaker(s), Room/Location
   - Expandable abstract/description
   - Visual differentiation for session types (talk, workshop, panel, demo, break, social)
   - Orange accent on hover/expand

4. **Parallel Sessions**
   - Side-by-side columns when sessions run simultaneously
   - Room/track labels per column

5. **Add to Calendar (per session)**
   - Icon/button on each session card
   - Options: Google Calendar, Apple Calendar, .ics download
   - Calendar event includes: time, title, location, 15-min reminder

#### Session Types
- Talk
- Workshop
- Panel
- Demo
- Break (lunch, coffee)
- Social (happy hour, after-party, ski day)

#### Data Structure (`/data/schedule.yaml`)
```yaml
summit:
  year: 2026
  dates:
    pre_summit: "2026-02-26"
    day1: "2026-02-27"
    day2: "2026-02-28"
  venue:
    name: "The Space"
    address: "3700 N Franklin St, Denver, CO 80205"
    timezone: "America/Denver"

days:
  - date: "2026-02-26"
    name: "Pre-Summit"
    sessions:
      - id: "ski-day"
        title: "Ski Day"
        type: "social"
        start: "09:00"
        end: "15:00"
        description: "Optional ski outing"
        location: "TBD"
      - id: "happy-hour"
        title: "Welcome Happy Hour"
        type: "social"
        start: "17:00"
        end: "20:00"
        location: "The Space"

  - date: "2026-02-27"
    name: "Day 1"
    sessions:
      - id: "session-1"
        title: "Session Title"
        type: "talk"
        start: "10:00"
        end: "10:45"
        speakers: ["Speaker Name"]
        description: "Session abstract..."
        location: "Main Room"
        track: "main"  # or "breakout" for parallel sessions
```

---

### 6. Archived Summit Pages (`/summit/[year]`)

- Same structure as main summit page
- Read-only historical record
- `/summit` always shows current/upcoming
- Past years accessible via footer link or explicit URL

---

## Global Components

### Navigation Header
- **Desktop:** Fixed header, horizontal nav links
  - Home, Education, Grants, Summit, Schedule (when summit active)
- **Mobile:** Hamburger menu
- Logo/wordmark links to home

### Footer
- 256 Foundation project attribution
- Links: 256foundation.org, github.com/256foundation
- Social links: Telegram, X, Forum
- Copyright

### Theme
- System preference (auto dark/light mode)
- Orange/fire accent colors
- Dark mode: dark backgrounds with light text
- Light mode: light backgrounds with dark text
- Consistent brand colors across both modes

---

## External Integrations

### Discourse Forum API
- **Endpoint:** `https://forum.heatpunks.org/latest.json`
- **Method:** Server-side fetch with caching
- **Cache Duration:** 5 minutes
- **Fallback:** API key authentication if public access restricted
- **Error Handling:** Hide forum section on failure

### Umami Analytics
- Self-hosted Umami instance on Proxmox
- Script tag with site ID in layout
- Privacy-friendly, no cookies

### Proton Mail SMTP
- Contact form sends via Proton Mail SMTP
- Environment variables for SMTP credentials
- Sends to admin@heatpunks.org

### OpenStreetMap
- Embedded map for venue location
- No API key required
- iframe embed or Leaflet.js

### YouTube Embeds
- Standard YouTube iframe embeds
- Video IDs hardcoded in data file
- Responsive aspect ratio containers

---

## SEO & Social (Detailed Specification)

### Site Identity
- **Site Name**: Hashrate Heatpunks
- **Base URL**: https://heatpunks.org
- **Title Format**: `{Page Name} | Hashrate Heatpunks`
- **Twitter Handle**: @HashHeatpunks
- **Location**: Denver, Colorado
- **Founded**: 2024
- **Entity Type**: Project of 256 Foundation

### Target Keywords (Primary)
- hashrate heating
- bitcoin mining heat
- bitcoin home heating
- mining heat reuse

### Canonical URL Format
- Without trailing slash (e.g., `https://heatpunks.org/summit`)

---

### Page-by-Page Metadata

#### Home Page (`/`)
| Field | Value |
|-------|-------|
| Title | `Hashrate Heatpunks` |
| Description | `Join a community of builders turning Bitcoin mining heat into sustainable home heating solutions.` |
| OG Image | Unique branded image with logo and tagline |
| Alt Text | `Hashrate Heatpunks - Bitcoin mining heat reuse community` |

#### Summit Page (`/summit`)
| Field | Value |
|-------|-------|
| Title | `Summit 2026 \| Hashrate Heatpunks` |
| Description | `Heatpunk Summit 2026 - February 27-28 in Denver, CO. Join 150+ builders for workshops, demos, and networking.` |
| OG Image | **Dynamic** - Event poster style with bold typography, date (FEB 27-28, 2026), location (Denver, CO), and flame/heat aesthetic. Changes based on event status. |
| Alt Text | `Heatpunk Summit 2026 - February 27-28, Denver Colorado` |

#### Summit Schedule Page (`/summit/schedule`)
| Field | Value |
|-------|-------|
| Title | `Summit Schedule \| Hashrate Heatpunks` |
| Description | `Full schedule for Heatpunk Summit 2026. Workshops, demos, panels, and networking events.` |
| OG Image | Use Summit page OG image |
| Alt Text | `Heatpunk Summit 2026 Schedule` |

#### Grants Page (`/grants`)
| Field | Value |
|-------|-------|
| Title | `Grants \| Hashrate Heatpunks` |
| Description | `Apply for grants to support hashrate heating projects. Funding for builders, researchers, and educators.` |
| OG Image | Unique image with grant/funding theme |
| Alt Text | `Hashrate Heatpunks Grants Program` |
| Note | Do NOT mention Bitcoin payment in meta description |

#### Mission Page (`/mission`)
| Field | Value |
|-------|-------|
| Title | `Mission \| Hashrate Heatpunks` |
| Description | `Our mission: make hashrate heating accessible to everyone. Learn about our vision for sustainable Bitcoin mining heat reuse.` |
| OG Image | Unique branded mission image |
| Alt Text | `Hashrate Heatpunks Mission` |

#### Education/Resources Page (`/education`)
| Field | Value |
|-------|-------|
| Title | `Resources \| Hashrate Heatpunks` |
| Description | `DIY guides and tutorials for building Bitcoin mining heaters. Learn how to turn hashrate into home heat.` |
| OG Image | Unique educational/DIY themed image |
| Alt Text | `Hashrate Heating Resources and Guides` |
| Keywords Focus | DIY bitcoin heater, build mining heater, hashrate heating guide |

#### Forum Redirect (`/forum`)
| Field | Value |
|-------|-------|
| Title | `Forum \| Hashrate Heatpunks` |
| Description | `Join the Hashrate Heatpunks community discussion. Ask questions, share projects, and connect with builders.` |
| OG Image | Unique "Join the Discussion" themed image |
| Alt Text | `Hashrate Heatpunks Community Forum` |
| Note | Redirects to forum.heatpunks.org |

---

### Structured Data (JSON-LD)

#### Organization Schema (Global - in layout.tsx)
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Hashrate Heatpunks",
  "alternateName": "Heatpunks",
  "url": "https://heatpunks.org",
  "logo": "https://heatpunks.org/images/logo.png",
  "foundingDate": "2024",
  "parentOrganization": {
    "@type": "Organization",
    "name": "256 Foundation"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Denver",
    "addressRegion": "CO",
    "addressCountry": "US"
  },
  "sameAs": [
    "https://twitter.com/HashHeatpunks",
    "https://forum.heatpunks.org"
  ]
}
```

#### Event Schema (Summit Page)
```json
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Heatpunk Summit 2026",
  "description": "Annual gathering of hashrate heating builders, featuring workshops, demos, and networking.",
  "startDate": "2026-02-27",
  "endDate": "2026-02-28",
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "location": {
    "@type": "Place",
    "name": "Denver",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Denver",
      "addressRegion": "CO",
      "addressCountry": "US"
    }
  },
  "organizer": {
    "@type": "Organization",
    "name": "Hashrate Heatpunks",
    "url": "https://heatpunks.org"
  },
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
    "price": "0",
    "priceCurrency": "USD",
    "url": "https://heatpunks.org/summit"
  }
}
```

#### FAQ Schema (Grants Page)
Include FAQ structured data for common grant questions:
- What types of projects are eligible?
- How do I apply for a grant?
- What is the grant review process?
- How are grants disbursed?

---

### Sitemap Configuration

Include all public pages with appropriate priorities:

| URL | Priority | Change Frequency |
|-----|----------|------------------|
| `/` | 1.0 | weekly |
| `/summit` | 0.9 | weekly |
| `/summit/schedule` | 0.8 | weekly |
| `/grants` | 0.9 | monthly |
| `/mission` | 0.9 | monthly |
| `/education` | 0.8 | monthly |

---

### Robots.txt

```txt
User-agent: *
Allow: /

Sitemap: https://heatpunks.org/sitemap.xml
```

---

### OpenGraph Images

#### Generation Method
Use Next.js dynamic OG image generation via `/app/api/og/route.tsx`

#### Image Specifications
- **Dimensions**: 1200 x 630 pixels (standard OG size)
- **Format**: PNG
- **File Size**: Optimize for < 300KB

#### Per-Page Image Requirements

| Page | Style | Key Elements |
|------|-------|--------------|
| Home | Branded | Logo, tagline "Undermining the status quo", flame aesthetic |
| Summit | Event poster | Bold typography, "FEB 27-28, 2026", "DENVER, CO", flame/heat gradient |
| Grants | Funding theme | "Grants Program" text, supportive visual elements |
| Mission | Mission statement | Logo, "Our Mission" or key mission text |
| Education | DIY/Tutorial | Educational visual, "Resources & Guides" text |
| Forum | Community | "Join the Discussion" text, community vibe |

#### Dynamic Summit OG Logic
The Summit OG image should update based on event status:
- **Pre-event**: "FEB 27-28, 2026 • REQUEST INVITATION"
- **During event**: "HAPPENING NOW • DENVER, CO"
- **Post-event**: "SUMMIT 2026 COMPLETE • WATCH RECAP"

---

### Alt Text Patterns

#### Logo Images
- Main logo: `Hashrate Heatpunks logo`
- Dark mode logo: `Hashrate Heatpunks logo (light version)`

#### Sponsor Logos
- Pattern: `{Sponsor Name} logo - Heatpunk Summit sponsor`
- Example: `Braiins logo - Heatpunk Summit sponsor`

#### OG Images
- Pattern: `{Page title} - Hashrate Heatpunks`
- Example: `Heatpunk Summit 2026 - February 27-28, Denver Colorado`

---

### Twitter Card Configuration
- Card type: `summary_large_image` for all pages
- Site handle: `@HashHeatpunks`

---

### Testing Checklist

After implementation, verify with:
- [ ] Facebook Sharing Debugger (https://developers.facebook.com/tools/debug/)
- [ ] Twitter Card Validator (https://cards-dev.twitter.com/validator)
- [ ] LinkedIn Post Inspector (https://www.linkedin.com/post-inspector/)
- [ ] Google Rich Results Test (https://search.google.com/test/rich-results)
- [ ] Schema.org Validator (https://validator.schema.org/)

---

## Accessibility

- WCAG 2.1 AA compliance target
- Semantic HTML structure
- Proper heading hierarchy
- Alt text for images
- Keyboard navigation support
- Sufficient color contrast
- Focus indicators

---

## Performance Targets

- Lighthouse score: 90+ across all categories
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Image optimization via Next.js Image component
- Lazy loading for below-fold content

---

## File Structure

```
/heatpunk-website
├── /app
│   ├── layout.tsx           # Root layout with nav, footer, theme
│   ├── page.tsx              # Landing page
│   ├── /education
│   │   └── page.tsx          # Education page
│   ├── /grants
│   │   └── page.tsx          # Grants page
│   ├── /summit
│   │   ├── page.tsx          # Current summit landing
│   │   ├── /schedule
│   │   │   └── page.tsx      # Schedule page
│   │   └── /[year]
│   │       └── page.tsx      # Archived summits
│   └── /api
│       ├── /contact
│       │   └── route.ts      # Contact form handler
│       ├── /grants
│       │   └── route.ts      # Grant application handler
│       └── /forum
│           └── route.ts      # Discourse proxy (optional)
├── /components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ForumFeed.tsx
│   ├── VideoCarousel.tsx
│   ├── ScheduleDay.tsx
│   ├── SessionCard.tsx
│   ├── AddToCalendar.tsx
│   ├── ContactForm.tsx
│   ├── GrantsForm.tsx
│   ├── SponsorGrid.tsx
│   └── Map.tsx
├── /data
│   ├── schedule.yaml         # Summit schedule data
│   ├── sponsors.yaml         # Sponsor logos and links
│   └── videos.ts             # Hardcoded video data
├── /content
│   └── /education            # Future markdown articles
├── /public
│   ├── /images
│   │   ├── logo.svg
│   │   └── /sponsors         # Sponsor logo files
│   └── /resources
│       └── bitcoin-mining-heat-reuse.pdf
├── /lib
│   ├── discourse.ts          # Forum API client
│   ├── calendar.ts           # ICS generation utilities
│   └── email.ts              # SMTP email sender
├── tailwind.config.js
├── next.config.js
└── docker-compose.yml
```

---

## Environment Variables

```env
# Discourse Forum
DISCOURSE_URL=https://forum.heatpunks.org
DISCOURSE_API_KEY=           # Optional, if needed

# Email (Proton Mail SMTP)
SMTP_HOST=smtp.protonmail.ch
SMTP_PORT=587
SMTP_USER=admin@heatpunks.org
SMTP_PASS=                   # Proton Mail SMTP token

# Umami Analytics
NEXT_PUBLIC_UMAMI_WEBSITE_ID=
NEXT_PUBLIC_UMAMI_URL=

# Site
NEXT_PUBLIC_SITE_URL=https://heatpunks.org
```

---

## Explicitly Out of Scope

- User accounts / authentication
- Comments on any page
- E-commerce / ticket sales
- Print stylesheets
- Newsletter/email list signup (beyond contact form)
- Real-time features (chat, live updates)

---

## Success Criteria

1. **Functional Requirements**
   - [ ] All pages render correctly on desktop and mobile
   - [ ] Forum feed displays recent topics from Discourse
   - [ ] Schedule displays with expandable session details
   - [ ] Add-to-calendar generates correct .ics/calendar links
   - [ ] Contact form successfully sends emails
   - [ ] Grant application form successfully sends emails to grants@heatpunks.org
   - [ ] Video carousel works with expand-inline behavior
   - [ ] Dark/light mode follows system preference

2. **Performance**
   - [ ] Lighthouse performance score > 90
   - [ ] Page loads < 3 seconds on 3G

3. **SEO**
   - [ ] All pages have unique meta titles and descriptions
   - [ ] OG images generate correctly for social sharing
   - [ ] Sitemap.xml is accessible

4. **Deployment**
   - [ ] Docker container builds successfully
   - [ ] Site accessible at heatpunks.org
   - [ ] summit.heatpunks.org redirects correctly

---

## Launch Checklist

- [ ] Brand assets (logo, colors) integrated
- [ ] Sponsor logos collected and added
- [ ] Schedule YAML populated with real sessions
- [ ] Video IDs updated with 2025 summit recordings
- [ ] Book PDF added to `/public/resources/`
- [ ] SMTP credentials configured
- [ ] Umami tracking configured
- [ ] DNS configured for heatpunks.org
- [ ] DNS redirect for summit.heatpunks.org
- [ ] Docker deployment tested
- [ ] Mobile responsiveness verified
- [ ] Cross-browser testing complete
