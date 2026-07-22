# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

The community website for the **Hashrate Heatpunks**, a project of the [256 Foundation](https://256foundation.org). Live at [heatpunks.org](https://heatpunks.org). It's the hub for the community: a landing page with a live forum feed, educational resources (books, guides, summit talk videos), and Heatpunk Summit event pages with full schedules.

**Grants note:** Heatpunks does **not** run its own grant program. Grants are run by the parent [256 Foundation](https://256foundation.org/grants) (open-source Bitcoin mining & decentralization; funds open-source work only). The Heatpunks site only *describes* that program and links out to it — there is no `/grants` page, grants form, or grants API here. `/grants` 308-redirects to `256foundation.org/grants` (see `next.config.js`). See [SPEC-grants-256foundation.md](SPEC-grants-256foundation.md).

**Stack:** Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS · Web3Forms (client-side form submissions) + hCaptcha (spam protection) · Discourse (read-only API proxy) · Jest + React Testing Library · Docker (standalone output).

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
| 256 Foundation grants/donate links (used by re-framed grants copy) | `data/site.ts` → `foundation.grants` / `foundation.donate` |
| Summit talk / recap videos | `data/videos.ts` (Summit page features entry 0; Education page lists all) |
| Summit schedule | `data/schedule.yaml` |
| Summit sponsors | `data/sponsors.yaml` |
| 2025 / 2027 summit archive content | `data/summit2025.ts` / `data/summit2027.ts` |
| Info-deck carousel slides | `data/infoDeck.ts` (+ images in `public/images/info-deck/`) |

If you find yourself reading many component files to make one edit, stop and check `/data` first.

## Architecture

Single Next.js app: mostly static pages plus a thin server layer for the forum proxy, calendar files, and OG images. Form submissions (contact form, summit waitlist) are NOT server-side — both forms POST directly from the browser to Web3Forms (`https://api.web3forms.com/submit`); there is no `/api/contact` or `/api/summit-invitation` route and no email-sending backend in this repo.

```
app/            App Router pages + API routes
  api/          og
components/     React components, grouped by section:
                landing · education · summit · schedule · layout · shared
lib/            Server-side helpers: discourse · calendar · schedule · scheduleUtils · utils
data/           Site content + config as TS/YAML (see table above)
types/          Shared TypeScript types
content/        Placeholder for long-form educational content (currently empty)
public/         Static assets: images, downloadable PDFs
```

**Pages** are React Server Components; interactive pieces (video carousel, forms, expandable schedule cards, mobile nav, modals) are client components.

Routes: `/`, `/mission`, `/education`, `/summit` (2027, forward-looking), `/summit/2025`, `/summit/2026` (rich archives), `/summit/schedule`, and `/summit/[year]` (a generic archive fallback — its `archivedYears` list is currently empty, so it 404s for all years). `/grants` is not a page — it 308-redirects to `256foundation.org/grants` (`next.config.js`).

**Forms:** `ContactForm.tsx` (landing page) and `WaitlistModal.tsx` (summit pages) each build a `FormData` from their form element (including hidden `access_key`/`subject` inputs and a `botcheck` honeypot) and `fetch()` it straight to Web3Forms — no proxy route in this codebase. Each form is a **separate Web3Forms account entry with its own access key** (`NEXT_PUBLIC_WEB3FORMS_CONTACT_ACCESS_KEY` / `NEXT_PUBLIC_WEB3FORMS_WAITLIST_ACCESS_KEY`) — don't assume one key works for both. Both also embed an `HCaptcha` widget (`@hcaptcha/react-hcaptcha`, using Web3Forms' shared free-tier sitekey) since both Web3Forms forms have hCaptcha required; the token is appended as `h-captcha-response` before submitting. Web3Forms routes each form's notification email to whatever address is configured in its own dashboard entry (currently `tyler@256foundation.org` for both) — that's account-side config, not code.

**API routes:**
- `GET /api/og` — generates Open Graph social images on the fly.

The forum feed is fetched and cached from Discourse in `lib/discourse.ts` (the only file with a test suite: `lib/__tests__/discourse.test.ts`).

For design rationale and data models, see [ARCHITECTURE.md](ARCHITECTURE.md) and [SPEC.md](SPEC.md) — but note these are **historical pre-launch design docs** (each carries a status banner listing where it has since diverged: Brevo SMTP not Proton, single admin@ inbox, no `/api/forum` route, etc.). The 2027 pivot (2027 summit page + 2025/2026 archives) is specced in [SPEC-summit-2027.md](SPEC-summit-2027.md), which is current.

## Environment

Copy `.env.example` → `.env.local`. All vars are optional for the site to render; each enables a feature:
- `NEXT_PUBLIC_WEB3FORMS_CONTACT_ACCESS_KEY` / `NEXT_PUBLIC_WEB3FORMS_WAITLIST_ACCESS_KEY` — required for the contact form and summit waitlist (respectively) to actually submit — they POST client-side directly to Web3Forms. Each form is a separate entry in the Web3Forms dashboard with its own access key; they are not interchangeable. Both are `NEXT_PUBLIC_` vars baked in at build time — must be set before building/deploying, not just in local `.env.local`.
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
