# Build stage: pnpm version comes from "packageManager" in package.json, through corepack
FROM node:24-alpine AS builder
WORKDIR /app
RUN corepack enable pnpm
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
# Public API URL: next build inlines it into the bundle, and src/config/env.ts fails the build without it.
# The default is the one in .env.example; other environments pass --build-arg NEXT_PUBLIC_API_URL=<url>.
ARG NEXT_PUBLIC_API_URL=http://localhost:4000/api
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm build

# Runtime stage: only the standalone server (output: "standalone" in next.config.ts), static assets and public/
FROM node:24-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production PORT=3000 HOSTNAME=0.0.0.0
COPY --from=builder /app/public ./public
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
USER node
EXPOSE 3000
CMD ["node", "server.js"]
