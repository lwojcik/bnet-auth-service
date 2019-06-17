require('dotenv').config();
import fastify, { ServerOptions, Plugin, FastifyInstance } from 'fastify';
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

const fastifyServer = fastify({
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
  routes.status,
  routes.getAccessToken,
  routes.refreshAccessToken,
] as FastifyPlugins;

/* Registering server plugins */

const registerPlugins = (server: FastifyInstance, plugins: FastifyPlugins) => {
  plugins.map((plugin) => {
    if (typeof plugin === 'function') {
      server.register(plugin);
    } else if (plugin !== null && 'plugin' in plugin && 'options' in plugin) {
      server.register(plugin.plugin, plugin.options);
    }
  });
}

/* Server invocation */

const startServer = async () => {
  try {
    registerPlugins(fastifyServer, plugins);
    await fastifyServer.listen(appConfig.port);
    fastifyServer.blipp();
  } catch (err) {
    fastifyServer.log.error(err);
    process.exit(1);
  }
};

/* Here we go! */

export = {
  start: startServer,
}
