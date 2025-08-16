# syntax=docker/dockerfile:1

ARG NODE_VERSION=23.11.0

################################################################################
# Base image
FROM node:${NODE_VERSION}-alpine AS base
WORKDIR /usr/src/app

################################################################################
# Build stage (install all dependencies including devDependencies)
FROM base AS build

# Copy package.json and lockfile
COPY package*.json ./

# Install all dependencies (dev + prod) for build
RUN npm ci

# Copy the rest of the source code
COPY . .

# Run build (e.g., SvelteKit)
RUN npm run build

################################################################################
# Production stage (minimal image)
FROM node:${NODE_VERSION}-alpine AS final
WORKDIR /usr/src/app

# Copy package.json and lockfile
COPY package*.json ./

# Install only production dependencies and ignore scripts to avoid prepare errors
RUN npm ci --omit=dev --ignore-scripts

# Copy built application from build stage
COPY --from=build /usr/src/app/build ./build

# Set NODE_ENV to production
ENV NODE_ENV=production

# Use non-root user
USER node

ENV PORT=80

# Run the application
CMD ["node", "build"]