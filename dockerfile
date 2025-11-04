# === STAGE 1: BUILD ===
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install
COPY . .

# Pass build-time environment variables from the build command
ARG NEXT_PUBLIC_URL_SQL_RECOMMENDER
ARG NEXT_PUBLIC_URL_VALIDATA
ARG NEXT_PUBLIC_URL_DATA_QUALITY_FORM
ARG NEXT_PUBLIC_URL_DATA_DEFINITIONS
ARG NEXT_PUBLIC_URL_DATA_GLOSSARY
ARG NEXT_PUBLIC_URL_SOP_DOCS
ARG NEXT_PUBLIC_URL_GITREPO

# Set them as environment variables for the build process
ENV NEXT_PUBLIC_URL_SQL_RECOMMENDER=$NEXT_PUBLIC_URL_SQL_RECOMMENDER
ENV NEXT_PUBLIC_URL_VALIDATA=$NEXT_PUBLIC_URL_VALIDATA
ENV NEXT_PUBLIC_URL_DATA_QUALITY_FORM=$NEXT_PUBLIC_URL_DATA_QUALITY_FORM
ENV NEXT_PUBLIC_URL_DATA_DEFINITIONS=$NEXT_PUBLIC_URL_DATA_DEFINITIONS
ENV NEXT_PUBLIC_URL_DATA_GLOSSARY=$NEXT_PUBLIC_URL_DATA_GLOSSARY
ENV NEXT_PUBLIC_URL_SOP_DOCS=$NEXT_PUBLIC_URL_SOP_DOCS
ENV NEXT_PUBLIC_URL_GITREPO=$NEXT_PUBLIC_URL_GITREPO

RUN npm run build


# === STAGE 2: PRODUCTION ===
FROM node:20-alpine AS runner
WORKDIR /app

RUN addgroup -S nodejs
RUN adduser -S nextjs -G nodejs

# Copy only the necessary files from the "builder" stage
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
ENV PORT 3000
EXPOSE 3000
CMD ["node", "server.js"]