
FROM node:20-slim AS base

FROM base AS builder

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN npm run build

FROM base AS runner

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

COPY .env .env

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

RUN mkdir db
RUN chown nextjs:nodejs db
COPY --from=builder --chown=nextjs:nodejs /app/db/db.sqlite ./db/db.sqlite

RUN chown nextjs:nodejs ./db/db.sqlite
RUN chmod 644 ./db/db.sqlite

USER nextjs

EXPOSE 3000

ENV PORT=3000

ENV HOSTNAME 0.0.0.0

CMD node server.js