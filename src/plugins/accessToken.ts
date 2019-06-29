import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";
import { BlizzAPI } from "blizzapi";

interface BnetConfig {
  [key: string]: string | number | boolean;
  region: string;
  apiKey: string;
  apiSecret: string;
}

interface RedisConfig {
  [key: string]: string | number | boolean;
  enable: boolean;
  cacheSegment: string;
  replyCachePeriod: number;
}

interface AccessTokenOptions {
  [key: string]: object | string | number | boolean;
  bnet: BnetConfig;
  redis: RedisConfig;
}

export default fp(
  (server: FastifyInstance, opts: AccessTokenOptions, next: Function) => {
    const { bnet, redis } = opts;
    const { region, apiKey, apiSecret } = bnet;
    const { enable, cacheSegment, replyCachePeriod } = redis;
    const cache = server.redis;

    const getFreshAccessToken = () =>
      new BlizzAPI(region, apiKey, apiSecret).getAccessToken();

    const getCachedAccessToken = () => server.redis.get(cacheSegment);

    const isAccessTokenCached = async () => {
      if (server.redis && enable) {
        return (await server.redis.get(cacheSegment)) ? true : false;
      }
      return Promise.resolve(false);
    };

    const cacheAccessToken = async (accessToken: string) => {
      if (!enable) return "Access token not refreshed (Redis disabled)";
      await cache.set(cacheSegment, accessToken);
      await cache.expire(cacheSegment, replyCachePeriod);
      return "Access token refreshed successfully";
    };

    const getAccessToken = async (refresh: Boolean) => {
      const noKeyInCache = !(await isAccessTokenCached());
      if (noKeyInCache || refresh) {
        const accessToken = await getFreshAccessToken();
        cacheAccessToken(accessToken);
        return accessToken;
      }

      return getCachedAccessToken();
    };

    server.decorate("accessToken", {
      getAccessToken,
      getFreshAccessToken,
      getCachedAccessToken,
      isAccessTokenCached,
      cacheAccessToken
    });

    next();
  }
);
