# Dockerfile for Brev.ly backend (server)
# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci --ignore-scripts

# Copy source code
COPY . .

# Build TypeScript (if needed)
RUN npm run build || true

# Stage 2: Production image
FROM node:20-alpine AS production

WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/init.sql ./init.sql
COPY --from=builder /app/drizzle.config.ts ./drizzle.config.ts
COPY --from=builder /app/biome.json ./biome.json
COPY --from=builder /app/docker/ ./docker/

# If you need to copy migrations, uncomment below
COPY --from=builder /app/src/infra/db/migrations ./src/infra/db/migrations

# Expose the port
EXPOSE 3333

# Start the application
CMD ["node", "dist/infra/http/server.js"]
