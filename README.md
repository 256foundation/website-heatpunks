# Hashrate Heatpunks Website

The community website for the **Hashrate Heatpunks** — a community working on the emerging hashrate heating industry, marrying the bitcoin mining and heating sectors to bring hashrate back to homes and businesses. It's a community project of the [256 Foundation](https://256foundation.org).

Live at **[heatpunks.org](https://heatpunks.org)**.

The site is the hub for the community: a landing page with a live forum feed, educational resources (books, guides, summit talk videos), the Hashrate Heatpunk Grant Program, and Heatpunk Summit event pages with full schedules.

---

## Tech stack

- **[Next.js 14](https://nextjs.org)** (App Router) with React 18 and TypeScript
- **[Tailwind CSS](https://tailwindcss.com)** for styling
- **[Web3Forms](https://web3forms.com)** for form submissions (contact form, summit waitlist) — forms POST directly from the browser, no server-side email backend — with an embedded **hCaptcha** widget for spam protection
- **[Discourse](https://www.discourse.org)** as the external community forum, surfaced via a read-only API proxy
- **Jest** + **React Testing Library** for tests
- **Docker** (standalone output) for self-hosting

Design goals: static-first with selective server-side rendering, minimal external dependencies, and maintainable by novice developers.

---

## Architecture

The site is a single Next.js application that renders mostly static pages, with a thin server layer for the few features that need it (proxying the forum feed, generating calendar files and Open Graph images). Form submissions are not server-side at all — both forms POST directly from the browser to Web3Forms.

```
Browser
  │  HTTPS                              │ HTTPS (direct)
  ▼                                      ▼
Next.js server (Docker container)      Web3Forms (+ hCaptcha)
  ├─ App Router (/app)        server-rendered pages + client components
  ├─ API routes (/app/api)    og
  ├─ Lib layer (/lib)         discourse (fetch+cache), calendar (ICS), schedule
  └─ Data layer (/data)       content as TS/YAML: site config, videos, schedule, sponsors
        │ HTTPS
        ▼
   Discourse forum + YouTube embeds
```

**Request flow at a glance:**

- **Pages** (`/`, `/mission`, `/education`, `/summit` (the 2027 summit), `/summit/2025` and `/summit/2026` (rich archives), `/summit/schedule`) are React Server Components. Interactive pieces (video carousel, forms, expandable schedule cards, mobile nav, modals) are client components. A generic `/summit/[year]` fallback route also exists for future archives. `/grants` isn't a page — it 308-redirects to `256foundation.org/grants`.
- **API routes** handle the dynamic work:
  - `GET /api/og` — generates Open Graph social images on the fly.
- **Forms** (`ContactForm`, `WaitlistModal`) `fetch()` straight to `https://api.web3forms.com/submit` with a `FormData` payload (including an embedded hCaptcha token) — no proxy route, no email library in this repo. Web3Forms delivers the notification email per its own dashboard configuration.
- **Content is data, not hardcoded markup.** Most page content lives in `/data` (e.g. `site.ts`, `videos.ts`, `schedule.yaml`, `sponsors.yaml`) so it can be edited without touching components.

For the full design — component breakdown, data models, caching strategy, and rationale — see **[ARCHITECTURE.md](ARCHITECTURE.md)** and **[SPEC.md](SPEC.md)**.

### Project structure

```
app/            App Router pages and API routes
  api/          og
components/     React components, grouped by section (landing, education, summit, schedule, layout, shared)
lib/            Server-side helpers: discourse, calendar, schedule, utils
data/           Site content and config (TS + YAML)
types/          Shared TypeScript types
content/        Long-form educational content
public/         Static assets (images, downloadable resources)
```

### A note on editing content

Common edits don't require component changes:

- **Summit videos** — edit `data/videos.ts`. The Summit page features the first entry and the Education page lists them.
- **Schedule & sponsors** — edit `data/schedule.yaml` and `data/sponsors.yaml`.
- **Site-wide links, navigation, and the grant program toggle** — edit `data/site.ts`. The grant program can be paused/reopened by flipping `grants.open` there, which gates the application form, the API endpoint, and all "apply" CTAs across the site in one place.

---

## Local development

**Prerequisites:** [Node.js 20](https://nodejs.org) and npm.

```bash
# 1. Install dependencies
npm install

# 2. Create your local env file
cp .env.example .env.local
#    Then fill in values (see "Environment variables" below).
#    The site runs without them, but the forms and forum feed stay inert.

# 3. Start the dev server
npm run dev
```

The site is then available at **http://localhost:3000**.

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server (hot reload) |
| `npm run build` | Production build |
| `npm run start` | Serve a production build |
| `npm run lint` | Run ESLint |
| `npm run test` | Run the Jest test suite |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with a coverage report |

---

## Environment variables

Copy `.env.example` to `.env.local` (development) or provide these to the container (production). All are optional for the site to render — they enable specific features.

| Variable | Required for | Notes |
|----------|--------------|-------|
| `NEXT_PUBLIC_WEB3FORMS_CONTACT_ACCESS_KEY` | Contact form | Access key for the contact form's entry in [web3forms.com](https://web3forms.com) — each form is a separate entry with its own key |
| `NEXT_PUBLIC_WEB3FORMS_WAITLIST_ACCESS_KEY` | Summit waitlist | Access key for the waitlist's separate Web3Forms entry |
| `DISCOURSE_URL` | Forum feed | Base URL of the Discourse instance |
| `DISCOURSE_API_KEY` | Forum feed | Only if the forum requires authentication |
| `DISCOURSE_API_USERNAME` | Forum feed | Only if the forum requires authentication |
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, OG images | e.g. `https://heatpunks.org` |
| `NEXT_PUBLIC_UMAMI_WEBSITE_ID` | Analytics | Optional [Umami](https://umami.is) analytics |
| `NEXT_PUBLIC_UMAMI_URL` | Analytics | Optional Umami script URL |

> `NEXT_PUBLIC_*` variables are read at **build time** and baked into the client bundle — set them before building, not just at runtime. This includes both Web3Forms keys.

Without the two `NEXT_PUBLIC_WEB3FORMS_*_ACCESS_KEY` vars configured, the contact form and summit waitlist (respectively) will fail to submit. Without `DISCOURSE_URL`, the live forum feed on the landing page is simply omitted.

---

## Self-hosting

The app builds to a self-contained [Next.js standalone](https://nextjs.org/docs/app/api-reference/next-config-js/output) bundle and ships with a multi-stage `Dockerfile` and a `docker-compose.yml`. It listens on port **3000**.

### Option A — Docker Compose (recommended)

1. Create a `.env` file in the project root with your production values (at minimum `NEXT_PUBLIC_SITE_URL`, plus the two `NEXT_PUBLIC_WEB3FORMS_*_ACCESS_KEY` vars if you want the forms to submit and `DISCOURSE_*` if you want the forum feed):

   ```bash
   cp .env.example .env
   # edit .env
   ```

2. Build and start:

   ```bash
   docker compose up -d --build
   ```

   This builds the image (passing the `NEXT_PUBLIC_*` build args), runs the container with a restart policy and a health check, and publishes it on port 3000.

3. View logs / stop:

   ```bash
   docker compose logs -f
   docker compose down
   ```

### Option B — Plain Docker

```bash
docker build \
  --build-arg NEXT_PUBLIC_SITE_URL=https://your-domain.tld \
  --build-arg NEXT_PUBLIC_WEB3FORMS_CONTACT_ACCESS_KEY=... \
  --build-arg NEXT_PUBLIC_WEB3FORMS_WAITLIST_ACCESS_KEY=... \
  -t heatpunk-website .

docker run -d -p 3000:3000 \
  -e DISCOURSE_URL=https://your-forum.tld \
  --name heatpunk-website \
  heatpunk-website
```

### Option C — Node directly (no Docker)

```bash
npm ci
npm run build
npm run start   # serves the production build on port 3000
```

### Behind a reverse proxy

The container serves plain HTTP on port 3000. For production, put it behind a reverse proxy (nginx, Caddy, Traefik, etc.) to terminate TLS and forward to `localhost:3000`. The app already sets sensible security headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`) in `next.config.js`.

---

## External services

The site integrates with a few external services. None are required to run it locally, but they power production features:

- **[Web3Forms](https://web3forms.com)** — receives and routes form submissions (contact form, summit waitlist) directly from the browser; notification email is configured in its dashboard.
- **Discourse forum** ([forum.heatpunks.org](https://forum.heatpunks.org)) — the live community feed on the landing page is fetched and cached from its public API.
- **YouTube** — summit talks and recap videos are embedded.
- **Umami** *(optional)* — privacy-friendly, self-hostable analytics.

---

## License

[MIT](LICENSE) © Tyler Stevens
