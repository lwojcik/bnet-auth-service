require('dotenv').config();
import fastify, { ServerOptions, Plugin } from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';
import cors from 'fastify-cors';
// const rateLimit = require('fastify-rate-limit');
import blipp from 'fastify-blipp';
// const healthcheck = require('fastify-healthcheck');
// const compression = require('fastify-compress');
import helmet from 'fastify-helmet';
// const sensible = require('fastify-sensible');
import noIcon from 'fastify-no-icon';
import tlsKeygen from 'fastify-tls-keygen';
// const fastifyCaching = require('fastify-caching');
// const fastifyRedis = require('fastify-redis');
// const Redis = require('ioredis');
// const AbstractCache = require('abstract-cache');
// const twitchEbs = require('fastify-twitch-ebs-tools');

import appConfig from './config/app';
// const dbConfig = require('./config/database');
// const twitchConfig = require('./config/twitch');
// const redisConfig = require('./config/redis');

import routes from './routes/index';
// const saveConfigRoutes = require('./routes/v1.1/config/save');
// const getConfigRoutes = require('./routes/v1.1/config/get');

// const db = require('./plugins/db');

// const sc2pte = require('./plugins/sc2pte');

/* Fastify plugin types */

type FastifyPlugin = Plugin<Server, IncomingMessage, ServerResponse, any>;

interface FastifyPluginObject {
  plugin: FastifyPlugin;
  options: Object;
}

type FastifyPlugins = (FastifyPlugin | FastifyPluginObject)[];

/* Server instance */

const server = fastify({
  logger: process.env.NODE_ENV === 'development',
  https: process.env.API_HOST_PROTOCOL === 'https',
} as ServerOptions);

/* Server plugins */



const plugins = [
  /* Display the routes table to console at startup */
  blipp,

  /* CORS options */
  {
    plugin: cors,
    options: {
      origin: '*',
      methods: ['GET', 'POST'],
      credentials: true,
      allowedHeaders: [
        'X-Requested-With',
        'content-type',
        'channelId',
        'regionId',
        'realmId',
        'playerId',
        'selectedView',
        'token',
      ],
    }
  },

  /* Generate TLS certificate if served via HTTPS */
  (process.env.API_HOST_PROTOCOL === 'https' ? tlsKeygen : null),

  /* Deal with annoying /favicon.ico requests */
  noIcon,

  /* Important security headers */
  helmet,

  /* Routes */
  routes,
] as FastifyPlugins;

// /* Caching */

// const redisClient = new Redis(redisConfig.connectionString);

// const abcache = new AbstractCache({
//   useAwait: true,
//   driver: {
//     name: 'abstract-cache-redis',
//     options: {
//       client: redisClient,
//       cacheSegment: 'sc2pte-cache',
//     },
//   },
// });

// server.register(fastifyRedis, { client: redisClient });
// server.register(fastifyCaching, {
//   cache: abcache,
//   expiresIn: 5 * 60, // seconds
//   cacheSegment: env.API_REDIS_CACHE_SEGMENT,
// });

// /* Plugins */

// server.register(compression);
// server.register(helmet);
// server.register(db, { uri: dbConfig.connectionString });
// server.register(healthcheck, { healthcheckUrl: '/status' });
// server.register(rateLimit, {
//   max: 100,
//   timeWindow: '1 minute',
//   redis: redisClient,
//   whitelist: ['127.0.0.1'],
//   skipOnError: true,
// });
// server.register(sensible);
// server.register(twitchEbs, {
//   enabled: env.NODE_ENV === 'production',
//   secret: twitchConfig.sharedSecret,
// });
// server.register(noIcon);
// server.register(sc2pte);

// if (env.API_HOST_PROTOCOL === 'https') {
//   server.register(tlsKeygen);
// }

// /* Routes */

// server.register(getViewerRoutes);
// server.register(getConfigRoutes);
// server.register(saveConfigRoutes);

/* Registering server plugins */

const registerPlugins = (plugins: FastifyPlugins) => {
  plugins.map((plugin) => {
    if (typeof plugin === 'function') {
      server.register(plugin);
    } else if (plugin !== null && 'plugin' in plugin && 'options' in plugin) {
      server.register(plugin.plugin, plugin.options);
    }
  });
}

/* Server invocation */

const start = async () => {
  try {
    await server.listen(appConfig.port);
    server.blipp();
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

/* Exception handling */

process.on('uncaughtException', (error) => {
  console.error(error);
});
process.on('unhandledRejection', (error) => {
  console.error(error);
});

/* Here we go! */

registerPlugins(plugins);
start();
