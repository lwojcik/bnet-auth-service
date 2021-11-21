FROM node:lts-alpine
ENV NODE_ENV production
RUN apk add dumb-init
WORKDIR /usr/src/app
COPY --chown=node:node . .
RUN npm ci --only=production
EXPOSE 8083
USER node
CMD ["dumb-init", "node", "scripts/start.js"]