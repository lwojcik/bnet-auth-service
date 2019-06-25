import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';
import { BlizzAPI } from 'blizzapi';

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
  bnet: BnetConfig,
  redis: RedisConfig
}

export default fp((server: FastifyInstance, opts:AccessTokenOptions, next: Function) => {
  const { bnet, redis } = opts;
  const { region, apiKey, apiSecret } = bnet;
  const { enable, cacheSegment, replyCachePeriod } = redis;

  const getFreshAccessToken = () => new BlizzAPI(region, apiKey, apiSecret).getAccessToken();

  const getCachedAccessToken = async () => {
    if (enable) {
      const response = await server.cache.get(cacheSegment);
      return response.item;
    }
    return getFreshAccessToken();
  }
    
  const isAccessTokenCached = () =>
    enable ? server.cache.has(cacheSegment) : false;
  
  const cacheAccessToken = (accessToken: string) => {
    if (!enable) return 'Access token not refreshed (Redis disabled)';
    server.cache.set(cacheSegment, accessToken, replyCachePeriod);
    return 'Access token refreshed successfully';
  }
  
  const getAccessToken = async (refresh: Boolean) => {
    const noKeyInCache = !(await isAccessTokenCached());
  
    if (noKeyInCache || refresh) {
      const accessToken = await getFreshAccessToken();
      await cacheAccessToken(accessToken);
      return accessToken;
    }
  
    return getCachedAccessToken();
  }

  server.decorate('accessToken', {
    getAccessToken,
    getFreshAccessToken,
    getCachedAccessToken,
    isAccessTokenCached,
    cacheAccessToken,
  });

  next();
});