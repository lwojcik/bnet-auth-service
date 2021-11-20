FROM node:16
ENV NODE_ENV production
USER node
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
RUN npm install
COPY --chown=node:node . .
EXPOSE 8080
CMD [ "node", "scripts/start.js" ]
