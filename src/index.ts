import { FastifyInstance } from "fastify";
import Redis from 'ioredis';
import AbstractCache from 'abstract-cache';

import * as routes from './routes';
import accessToken from './plugins/accessToken';

const api = (fastify: FastifyInstance, opts: any, next: Function) => {
  fastify.register(accessToken, { bnet: opts.bnet, redis: opts.redis })
  fastify.register(routes.status);
  fastify.register(routes.getAccessToken, opts.bnet);
  fastify.register(routes.refreshAccessToken, opts.bnet);

  // Redis cache setup
  
  if (opts.redis.enable) {
    const redisClient = new Redis(opts.redis.connectionString);

    fastify
      .register(require('fastify-redis') , {
        client: redisClient,
      })
      .register(require('fastify-caching'), {
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
        cacheSegment: opts.redis.cacheSegment,
      });
  }

  next();
}

module.exports = api;
