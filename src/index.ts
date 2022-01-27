import { FastifyInstance } from 'fastify';
import { RegionIdOrName } from 'blizzapi';
import fp from 'fastify-plugin';
import accessToken from './plugins/accessToken';
import * as routes from './routes';

interface ServerOptions {
  app: {
    nodeEnv: string;
    port: string;
  };
  redis: {
    enable: boolean;
    host: string;
    port: string;
    db: string;
    replyCachePeriod: number;
    cacheSegment: string;
  };
  bnet: {
    region: RegionIdOrName;
    clientId: string;
    clientSecret: string;
  };
}

const server = fp(
  (fastify: FastifyInstance, opts: ServerOptions, next: Function) => {
    fastify.register(accessToken, { bnet: opts.bnet, redis: opts.redis });
    fastify.register(routes.status);
    fastify.register(routes.getAccessToken);
    fastify.register(routes.refreshAccessToken);
    next();
  },
);

export = server;
