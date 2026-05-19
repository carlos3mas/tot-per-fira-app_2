FROM node:22-alpine

# Install pnpm
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# -------- Build arguments --------
ARG NEXT_PUBLIC_SERVER_URL
ARG NEXT_PUBLIC_APP_URL
ARG ENABLE_ADMIN_REGISTRATION
ARG BETTER_AUTH_SECRET
ARG BETTER_AUTH_URL
ARG DATABASE_URL
ARG DATABASE_AUTH_TOKEN

# -------- Env for runtime & build --------
ENV NEXT_PUBLIC_SERVER_URL=$NEXT_PUBLIC_SERVER_URL \
    NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL \
    ENABLE_ADMIN_REGISTRATION=$ENABLE_ADMIN_REGISTRATION \
    BETTER_AUTH_SECRET=$BETTER_AUTH_SECRET \
    BETTER_AUTH_URL=$BETTER_AUTH_URL \
    DATABASE_URL=$DATABASE_URL \
    DATABASE_AUTH_TOKEN=$DATABASE_AUTH_TOKEN

# Copy package files (optimiza cache)
COPY apps/web/package.json ./

# Install dependencies
RUN pnpm install

# Copy source
COPY apps/web ./

# Build the web app (usa las vars anteriores)
RUN pnpm build

EXPOSE 3000
CMD ["pnpm", "start"]
