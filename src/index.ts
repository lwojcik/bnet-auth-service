import { FastifyInstance } from "fastify";
import Redis from 'ioredis';
import RedisMock from 'ioredis-mock';
import AbstractCache from 'abstract-cache';

import * as routes from './routes';
import accessToken from './plugins/accessToken';

interface ServerOptions {
  app: {
    nodeEnv: string,
    port: string,
  },
  redis: {
    enable: boolean,
    connectionString: string,
    db: string,
    replyCachePeriod: number,
    cacheSegment: string,
  },
  bnet: {
    region: string,
    apiKey: string,
    apiSecret: string,
  }
}

const api = (fastify: FastifyInstance, opts: ServerOptions, next: Function) => {
  fastify.register(accessToken, { bnet: opts.bnet, redis: opts.redis })
  fastify.register(routes.status);
  fastify.register(routes.getAccessToken, opts.bnet);
  fastify.register(routes.refreshAccessToken, opts.bnet);

  if (opts.redis.enable) {
    const redisClient = (opts.app.nodeEnv !== 'test' && opts.redis.enable)
      ? new Redis(opts.redis.connectionString)
      : new RedisMock();

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
