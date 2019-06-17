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

const fastifyServer = fastify({
  logger: process.env.NODE_ENV === 'development'
} as ServerOptions);

/* Caching */

const cacheSetup = () => {
  if (redisConfig.enable) {
    const redisClient = new Redis(redisConfig.connectionString);

    return [
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
    ]
  }
  return {
    plugins: null,
  };
}

const plugins = [
  /* Display the routes table to console at startup */
  blipp,

  /* Routes */
  routes.status,
  routes.getAccessToken,
  routes.refreshAccessToken,
] as FastifyPlugins;

/* Registering server plugins */

const registerPlugins = (plugins: FastifyPlugins | null) => {
  if (plugins) {
    plugins.map((plugin) => {
      if (typeof plugin === 'function') {
        fastifyServer.register(plugin);
      } else if (plugin !== null && 'plugin' in plugin && 'options' in plugin) {
        fastifyServer.register(plugin.plugin, plugin.options);
      }
    });
  }
}

/* Server invocation */

const startServer = async () => {
  try {
    registerPlugins(plugins);
    if (redisConfig.enable) registerPlugins(cacheSetup() as FastifyPlugins);
    await fastifyServer.listen(appConfig.port);
    fastifyServer.blipp();
    fastifyServer.log.info(`Redis cache enabled: ${redisConfig.enable}`);
  } catch (err) {
    fastifyServer.log.error(err);
  }
};

/* Here we go! */

export = {
  start: startServer,
  registerPlugins: () => registerPlugins(plugins),
  instance: fastifyServer,
}
