ARG NODE_VERSION=lts-alpine

# development build
FROM node:$NODE_VERSION AS development
WORKDIR /app
COPY --chown=node:node package*.json ./
RUN npm ci
COPY --chown=node:node . .
USER node

# production build
FROM node:$NODE_VERSION AS build
WORKDIR /app
COPY --chown=node:node package*.json ./
COPY --chown=node:node --from=development /app/node_modules ./node_modules
COPY --chown=node:node . .
RUN npm run build
ENV NODE_ENV production
RUN npm ci --omit-dev --ignore-scripts && npm cache clean --force --loglevel=error
USER node

# production image
FROM node:$NODE_VERSION AS production
RUN apk add dumb-init
COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/dist ./dist
CMD ["dumb-init", "node", "dist/main.js"]
