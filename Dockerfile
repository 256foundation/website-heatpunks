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

# Build arguments for environment variables needed at build time
ARG NEXT_PUBLIC_SITE_URL=https://heatpunks.org
ARG NEXT_PUBLIC_WEB3FORMS_CONTACT_ACCESS_KEY
ARG NEXT_PUBLIC_WEB3FORMS_WAITLIST_ACCESS_KEY
ARG NEXT_PUBLIC_UMAMI_WEBSITE_ID
ARG NEXT_PUBLIC_UMAMI_URL

ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_WEB3FORMS_CONTACT_ACCESS_KEY=$NEXT_PUBLIC_WEB3FORMS_CONTACT_ACCESS_KEY
ENV NEXT_PUBLIC_WEB3FORMS_WAITLIST_ACCESS_KEY=$NEXT_PUBLIC_WEB3FORMS_WAITLIST_ACCESS_KEY
ENV NEXT_PUBLIC_UMAMI_WEBSITE_ID=$NEXT_PUBLIC_UMAMI_WEBSITE_ID
ENV NEXT_PUBLIC_UMAMI_URL=$NEXT_PUBLIC_UMAMI_URL
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# ─────────────────────────────────────
# Stage 3: Runner
# ─────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Copy data files needed at runtime
COPY --from=builder /app/data ./data

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
