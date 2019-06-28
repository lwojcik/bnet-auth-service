import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";
import { BlizzAPI } from "blizzapi";

interface BnetConfig {
  region: string;
  apiKey: string;
  apiSecret: string;
}

interface RedisConfig {
  enable: boolean;
  cacheSegment: string;
  replyCachePeriod: number;
}

interface AccessTokenOptions {
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

    const getCachedAccessToken = () => {
      return cache.get(cacheSegment);
    };

    const isAccessTokenCached = async () => {
      return (await cache.get(cacheSegment)) ? true : false;
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
