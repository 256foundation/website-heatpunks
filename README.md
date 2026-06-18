# Hashrate Heatpunks Website

The community website for the **Hashrate Heatpunks** — a community working on the emerging hashrate heating industry, marrying the bitcoin mining and heating sectors to bring hashrate back to homes and businesses. It's a community project of the [256 Foundation](https://256foundation.org).

Live at **[heatpunks.org](https://heatpunks.org)**.

The site is the hub for the community: a landing page with a live forum feed, educational resources (books, guides, summit talk videos), the Hashrate Heatpunk Grant Program, and Heatpunk Summit event pages with full schedules.

---

## Tech stack

- **[Next.js 14](https://nextjs.org)** (App Router) with React 18 and TypeScript
- **[Tailwind CSS](https://tailwindcss.com)** for styling
- **[Nodemailer](https://nodemailer.com)** for transactional email (contact, grant, and summit forms) over SMTP
- **[Discourse](https://www.discourse.org)** as the external community forum, surfaced via a read-only API proxy
- **Jest** + **React Testing Library** for tests
- **Docker** (standalone output) for self-hosting

Design goals: static-first with selective server-side rendering, minimal external dependencies, and maintainable by novice developers.

---

## Architecture

The site is a single Next.js application that renders mostly static pages, with a thin server layer for the few features that need it (sending email, proxying the forum feed, generating calendar files and Open Graph images).

```
Browser
  │  HTTPS
  ▼
Next.js server (Docker container)
  ├─ App Router (/app)        server-rendered pages + client components
  ├─ API routes (/app/api)    contact / grants / summit-invitation / og
  ├─ Lib layer (/lib)         email (SMTP), discourse (fetch+cache), calendar (ICS), schedule
  └─ Data layer (/data)       content as TS/YAML: site config, videos, schedule, sponsors, grants
        │ SMTP            │ HTTPS
        ▼                 ▼
   SMTP provider     Discourse forum + YouTube embeds
```

**Request flow at a glance:**

- **Pages** (`/`, `/mission`, `/education`, `/grants`, `/summit`, `/summit/[year]`, `/summit/schedule`) are React Server Components. Interactive pieces (video carousel, forms, expandable schedule cards, mobile nav) are client components.
- **API routes** handle the dynamic work:
  - `POST /api/contact`, `POST /api/grants`, `POST /api/summit-invitation` — validate input and send email via `lib/email.ts`.
  - `GET /api/og` — generates Open Graph social images on the fly.
- **Content is data, not hardcoded markup.** Most page content lives in `/data` (e.g. `site.ts`, `videos.ts`, `schedule.yaml`, `sponsors.yaml`, `grants.ts`) so it can be edited without touching components.

For the full design — component breakdown, data models, caching strategy, and rationale — see **[ARCHITECTURE.md](ARCHITECTURE.md)** and **[SPEC.md](SPEC.md)**.

### Project structure

```
app/            App Router pages and API routes
  api/          contact, grants, summit-invitation, og
components/     React components, grouped by section (landing, education, grants, summit, schedule, layout, shared)
lib/            Server-side helpers: email, discourse, calendar, schedule, utils
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
#    The site runs without them, but email/forum features stay inert.

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
| `SMTP_HOST` | Email forms | SMTP server hostname (e.g. `smtp-relay.brevo.com`) |
| `SMTP_PORT` | Email forms | Typically `587` |
| `SMTP_SECURE` | Email forms | `false` for STARTTLS on port 587, `true` for 465 |
| `SMTP_USER` | Email forms | SMTP account login |
| `SMTP_PASS` | Email forms | SMTP key/password |
| `DISCOURSE_URL` | Forum feed | Base URL of the Discourse instance |
| `DISCOURSE_API_KEY` | Forum feed | Only if the forum requires authentication |
| `DISCOURSE_API_USERNAME` | Forum feed | Only if the forum requires authentication |
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, OG images | e.g. `https://heatpunks.org` |
| `NEXT_PUBLIC_UMAMI_WEBSITE_ID` | Analytics | Optional [Umami](https://umami.is) analytics |
| `NEXT_PUBLIC_UMAMI_URL` | Analytics | Optional Umami script URL |

> `NEXT_PUBLIC_*` variables are read at **build time** and baked into the client bundle — set them before building, not just at runtime.

Without SMTP configured, the contact/grant/summit forms will fail to send. Without `DISCOURSE_URL`, the live forum feed on the landing page is simply omitted.

---

## Self-hosting

The app builds to a self-contained [Next.js standalone](https://nextjs.org/docs/app/api-reference/next-config-js/output) bundle and ships with a multi-stage `Dockerfile` and a `docker-compose.yml`. It listens on port **3000**.

### Option A — Docker Compose (recommended)

1. Create a `.env` file in the project root with your production values (at minimum `NEXT_PUBLIC_SITE_URL`, and the `SMTP_*` / `DISCOURSE_*` vars if you want email and the forum feed):

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
  -t heatpunk-website .

docker run -d -p 3000:3000 \
  -e SMTP_HOST=... -e SMTP_PORT=587 -e SMTP_USER=... -e SMTP_PASS=... \
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

- **SMTP provider** — sends form submissions (contact, grant applications, summit invitations).
- **Discourse forum** ([forum.heatpunks.org](https://forum.heatpunks.org)) — the live community feed on the landing page is fetched and cached from its public API.
- **YouTube** — summit talks and recap videos are embedded.
- **Umami** *(optional)* — privacy-friendly, self-hostable analytics.

---

## License

[MIT](LICENSE) © Tyler Stevens
