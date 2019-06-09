require('dotenv').config();
import fastify, { ServerOptions, Plugin } from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';
import blipp from 'fastify-blipp';
import fastifyCaching from 'fastify-caching';
import fastifyRedis from 'fastify-redis';
import Redis from 'ioredis';
import AbstractCache from 'abstract-cache';

import appConfig from './config/app';
import redisConfig from './config/redis';

import * as routes from './routes/index';

/* Fastify plugin types */

type FastifyPlugin = Plugin<Server, IncomingMessage, ServerResponse, any>;

interface FastifyPluginObject {
  plugin: FastifyPlugin;
  options: Object;
}

type FastifyPlugins = (FastifyPlugin | FastifyPluginObject)[];

/* Server instance */

const server = fastify({
  logger: process.env.NODE_ENV === 'development'
} as ServerOptions);

/* Caching */

const redisClient = new Redis(redisConfig.connectionString);

const plugins = [
  /* Display the routes table to console at startup */
  blipp,

  /* Caching */

  {
    plugin: fastifyRedis,
    options: {
      client: redisClient,
    },
  },

  {
    plugin: fastifyCaching,
    options: {
      cache: new AbstractCache({
        useAwait: true,
        driver: {
          name: 'abstract-cache-redis',
          options: {
            client: redisClient,
            cacheSegment: 'bas-cache',
          },
        },
      }),
      expiresIn: 5 * 60, // seconds
      cacheSegment: process.env.API_REDIS_CACHE_SEGMENT,
    },
  },

  /* Routes */
  routes.checkAccessToken,
  routes.fetchAccessToken,
  routes.getAccessToken,
  routes.refreshAccessToken,
] as FastifyPlugins;

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
