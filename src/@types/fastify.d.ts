import * as fastify from "fastify";
import * as http from "http";

declare module "fastify" {
  export interface FastifyInstance<
    HttpServer = http.Server,
    HttpRequest = http.IncomingMessage,
    HttpResponse = http.ServerResponse
  > {
    blipp(): void;
    cache: {
      has: (key) => boolean,
      set: (key, value, cachePeriod) => any,
      get: (key) => Promise<{
        item: string,
        stored: number,
        ttl: number,
      }>,
    };
    log(): void;
    close(): Promise<any>;
    accessToken: {
      getAccessToken: (refresh: boolean) => Promise<string>,
      getFreshAccessToken,
      getCachedAccessToken,
      isAccessTokenCached,
      cacheAccessToken
    }
  }
}