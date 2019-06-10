import fp from 'fastify-plugin';
import schema from './schema';
import { BlizzAPI } from 'blizzapi';

import bnetConfig from '../../../config/bnet';
import redisConfig from '../../../config/redis';
import { FastifyInstance } from 'fastify';

const { region, apiKey, apiSecret } = bnetConfig;
const { replyCachePeriod, cacheSegment } = redisConfig;

const fetchAccessTokenFromBnet = async () => {
  return new BlizzAPI(region, apiKey, apiSecret).getAccessToken();
}

const getAccessTokenFromRedis = async (server: FastifyInstance): Promise<string> => {
  const isItCached = await server.cache.has(cacheSegment);
  if (!isItCached) {
    const accessToken = await fetchAccessTokenFromBnet();
    if (accessToken) {
      server.cache.set(cacheSegment, accessToken, replyCachePeriod);
      return accessToken;
    }
    return getAccessTokenFromRedis(server);
  }

  const response = await server.cache.get(cacheSegment);
  return response.item;
}

export default fp(async (server, {}, next) => {
  server.route({
    schema,
    url: '/accessToken/get',
    method: 'GET',
    handler: async (request, reply) => {
      const { refresh } = request.query;
      const accessToken = (!!refresh || !server.cache.has(cacheSegment))
        ? await fetchAccessTokenFromBnet()
        : await getAccessTokenFromRedis(server);

      return reply.code(200).send({
        status: 200,
        data: {
          accessToken,
        },
      });
    },
  });
  next();
});
