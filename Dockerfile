FROM node:20-alpine AS base
RUN apk add --no-cache git

FROM base AS builder
WORKDIR /app

WORKDIR /app/gaqno-ai
COPY gaqno-ai/package.json ./
COPY gaqno-ai/package-lock.json ./
RUN npm config set fetch-timeout 600000 && \
    npm config set fetch-retries 5 && \
    npm install --legacy-peer-deps

COPY gaqno-ai/ .
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/gaqno-ai/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/gaqno-ai/.next/static ./.next/static
RUN mkdir -p ./public

USER nextjs
EXPOSE 3003
ENV PORT=3003
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]
