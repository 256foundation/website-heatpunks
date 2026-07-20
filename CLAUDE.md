# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

The community website for the **Hashrate Heatpunks**, a project of the [256 Foundation](https://256foundation.org). Live at [heatpunks.org](https://heatpunks.org). It's the hub for the community: a landing page with a live forum feed, educational resources (books, guides, summit talk videos), the Hashrate Heatpunk Grant Program, and Heatpunk Summit event pages with full schedules.

**Stack:** Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS · Nodemailer (SMTP) · Discourse (read-only API proxy) · Jest + React Testing Library · Docker (standalone output).

Design goals: static-first with selective SSR, minimal external dependencies, maintainable by novice developers.

## Commands

| Command | What it does |
|---------|--------------|
| `npm run dev` | Dev server with hot reload (port 3000) |
| `npm run build` | Production build (standalone output) |
| `npm run start` | Serve a production build |
| `npm run lint` | ESLint (`next/core-web-vitals`) |
| `npm run test` | Jest suite |
| `npm run test:watch` / `test:coverage` | Watch mode / coverage |

To preview locally, use the `dev` launch config (`.claude/launch.json`) rather than running the server via Bash.

## Working efficiently in this repo (read this first)

Most changes are **content edits, not code changes** — content lives as data in `/data`, so you rarely need to touch components. Before opening components, check whether the change is really a data edit. This keeps sessions small and targeted.

Common edits and exactly where they live:

| To change… | Edit |
|---|---|
| External URLs, nav, social links, contact email, foundation info | `data/site.ts` |
| **Grant program open/closed** | `data/site.ts` → `grants.open` (gates the form, the API route, and every "apply" CTA in one flag) |
| Summit talk / recap videos | `data/videos.ts` (Summit page features entry 0; Education page lists all) |
| Summit schedule | `data/schedule.yaml` |
| Summit sponsors | `data/sponsors.yaml` |
| Grant categories / FAQ copy | `data/grants.ts` |
| 2025 / 2027 summit archive content | `data/summit2025.ts` / `data/summit2027.ts` |
| Info-deck carousel slides | `data/infoDeck.ts` (+ images in `public/images/info-deck/`) |

If you find yourself reading many component files to make one edit, stop and check `/data` first.

## Architecture

Single Next.js app: mostly static pages plus a thin server layer for email, the forum proxy, calendar files, and OG images.

```
app/            App Router pages + API routes
  api/          contact · grants · summit-invitation · og
components/     React components, grouped by section:
                landing · education · grants · summit · schedule · layout · shared
lib/            Server-side helpers: email · discourse · calendar · schedule · scheduleUtils · utils
data/           Site content + config as TS/YAML (see table above)
types/          Shared TypeScript types
content/        Placeholder for long-form educational content (currently empty)
public/         Static assets: images, downloadable PDFs
```

**Pages** are React Server Components; interactive pieces (video carousel, forms, expandable schedule cards, mobile nav, modals) are client components.

Routes: `/`, `/mission`, `/education`, `/grants`, `/summit` (2027, forward-looking), `/summit/2025`, `/summit/2026` (rich archives), `/summit/schedule`, and `/summit/[year]` (a generic archive fallback — its `archivedYears` list is currently empty, so it 404s for all years).

**API routes:**
- `POST /api/contact`, `POST /api/grants`, `POST /api/summit-invitation` — validate input, send email via `lib/email.ts`.
- `GET /api/og` — generates Open Graph social images on the fly.

The forum feed is fetched and cached from Discourse in `lib/discourse.ts` (the only file with a test suite: `lib/__tests__/discourse.test.ts`).

For design rationale and data models, see [ARCHITECTURE.md](ARCHITECTURE.md) and [SPEC.md](SPEC.md) — but note these are **historical pre-launch design docs** (each carries a status banner listing where it has since diverged: Brevo SMTP not Proton, single admin@ inbox, no `/api/forum` route, etc.). The 2027 pivot (2027 summit page + 2025/2026 archives) is specced in [SPEC-summit-2027.md](SPEC-summit-2027.md), which is current.

## Environment

Copy `.env.example` → `.env.local`. All vars are optional for the site to render; each enables a feature:
- `SMTP_*` — email forms (contact, grants, summit invitations). Without them, forms fail to send.
- `DISCOURSE_URL` (+ optional `DISCOURSE_API_KEY` / `DISCOURSE_API_USERNAME`) — the live forum feed. Without it, the feed is omitted.
- `NEXT_PUBLIC_SITE_URL` — canonical URLs and OG images. **Read at build time**, so set before building.
- `NEXT_PUBLIC_UMAMI_*` — optional analytics.

## Conventions

- **Content as data.** Prefer adding/editing `/data` over hardcoding copy in components.
- **Theme via CSS variables** defined in `app/globals.css` (the "Warm Heated Paper" palette). Match the Discourse forum to it using `docs/discourse/discourse-theme.md`.
- **Security headers** (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`) are set in `next.config.js`.
- **Tests** use Jest + ts-jest. Coverage is currently limited to `lib/discourse.ts`.
- Do not commit `.env.local`, `.next/`, `*.tsbuildinfo`, or `.DS_Store` (all gitignored).

## Deployment

Builds to a self-contained Next.js standalone bundle; ships with a multi-stage `Dockerfile` and `docker-compose.yml`, listening on port 3000. Run behind a reverse proxy for TLS. See the README's Self-hosting section for the three options (Compose / plain Docker / Node).
