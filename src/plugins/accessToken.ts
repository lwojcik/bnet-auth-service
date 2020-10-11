import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';
import BlizzAPI from 'blizzapi';

interface BnetConfig {
  [key: string]: string | number | boolean;
  region: string;
  clientId: string;
  clientSecret: string;
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
    const { region, clientId, clientSecret } = bnet;
    const { enable, cacheSegment, replyCachePeriod } = redis;
    const cache = (server as any).redis;

    const getFreshAccessToken = () =>
      new BlizzAPI({ region, clientId, clientSecret }).getAccessToken();

    const getCachedAccessToken = () => (server as any).redis.get(cacheSegment);

    const isAccessTokenCached = async () => {
      if ((server as any).redis && enable) {
        return Boolean(await (server as any).redis.get(cacheSegment));
      }
      return Promise.resolve(false);
    };

    const cacheAccessToken = async (accessToken: string) => {
      if (!enable) return 'Access token not refreshed (Redis disabled)';
      await cache.set(cacheSegment, accessToken);
      await cache.expire(cacheSegment, replyCachePeriod);
      return 'Access token refreshed successfully';
    };

    const getAccessToken = async (refresh?: Boolean) => {
      const noKeyInCache = !(await isAccessTokenCached());
      if (noKeyInCache || refresh) {
        const accessToken = await getFreshAccessToken();
        cacheAccessToken(accessToken);
        return accessToken;
      }
      return getCachedAccessToken();
    };

    (server as any).decorate('accessToken', {
      getAccessToken,
      getFreshAccessToken,
      getCachedAccessToken,
      isAccessTokenCached,
      cacheAccessToken,
    });

    next();
  },
);
