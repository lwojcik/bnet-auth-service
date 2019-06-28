import { FastifyInstance } from "fastify";
import * as routes from "./routes";
import accessToken from "./plugins/accessToken";

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
    region: string;
    apiKey: string;
    apiSecret: string;
  };
}

const api = async (
  fastify: FastifyInstance,
  opts: ServerOptions,
  next: Function
) => {
  fastify.register(routes.status);
  fastify.register(routes.getAccessToken, opts.bnet);
  fastify.register(routes.refreshAccessToken, opts.bnet);
  await fastify.register(accessToken, { bnet: opts.bnet, redis: opts.redis });

  next();
};

export default api;