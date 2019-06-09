require('dotenv').config();
import fastify, { ServerOptions, Plugin } from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';
// const rateLimit = require('fastify-rate-limit');
import blipp from 'fastify-blipp';
// const healthcheck = require('fastify-healthcheck');
// const compression = require('fastify-compress');
import helmet from 'fastify-helmet';
// const fastifyCaching = require('fastify-caching');
// const fastifyRedis = require('fastify-redis');
// import Redis from 'ioredis';
// import AbstractCache from 'abstract-cache';

import appConfig from './config/app';
// const redisConfig = require('./config/redis');

import * as routes from './routes/index';

// const db = require('./plugins/db');

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

// /* Caching */

// 
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

// const redisClient = new Redis(redisConfig.connectionString);

const plugins = [
  /* Display the routes table to console at startup */
  blipp,

  /* Important security headers */
  helmet,

  /* Routes */
  routes.checkAccessToken,
  routes.fetchAccessToken,
  routes.getAccessToken,
  routes.refreshAccessToken,
] as FastifyPlugins;

// server.register(fastifyRedis, { client: redisClient });
// server.register(fastifyCaching, {
//   cache: abcache,
//   expiresIn: 5 * 60, // seconds
//   cacheSegment: env.API_REDIS_CACHE_SEGMENT,
// });

// /* Plugins */

// server.register(compression);
// server.register(helmet);
// server.register(rateLimit, {
//   max: 100,
//   timeWindow: '1 minute',
//   redis: redisClient,
//   whitelist: ['127.0.0.1'],
//   skipOnError: true,
// });

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
