import { REDIS } from './environment';

export const PHRASES = {
  accessToken: {
    readingFromCache: 'Checking for cached access token',
    noCachedAccessToken:
      'Found no cached access token or "refresh" option was used',
    received: (token: string) => `Received access token: ${token}`,
    cachingAccessToken: (token: string) => `Caching access token: ${token}`,
  },
  battlenet: {
    usingClientId: (clientId: string) =>
      `Using Battle.net client id: ${clientId}`,
    usingClientSecret: (secret: string) =>
      `Using Battle.net client secret: ${secret}`,
    receivedAccessToken: (token: string) => `Received access token: ${token},`,
  },
  cache: {
    usingKey: (key: string) => `Using Redis key: ${key}`,
    usingTTL: (secs: number) => `Set TTL to ${secs} seconds`,
    accessKeyNotSaved: `${REDIS.enable} set to false - access key not saved`,
    cacheServiceDisabled: `${REDIS.enable} set to false - returning 'null' as access key`,
  },
  errors: {
    accessToken: 'Received access token error',
  },
};
