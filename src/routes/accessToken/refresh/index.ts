import fp from 'fastify-plugin';
import schema from './schema';
import { BlizzAPI } from 'blizzapi';

import bnetConfig from '../../../config/bnet';
import redisConfig from '../../../config/redis';

const { region, apiKey, apiSecret } = bnetConfig;
const { replyCachePeriod, cacheSegment } = redisConfig;

export default fp(async (server, {}, next) => {
  server.route({
    schema,
    url: '/accessToken/refresh',
    method: 'GET',
    handler: async ({}, reply) => {
      const accessToken = await new BlizzAPI(region, apiKey, apiSecret).getAccessToken();
      await server.cache.set(cacheSegment, accessToken, replyCachePeriod);

      return reply.code(200).send({
        status: 200,
        message: 'Refresh trigger successful',
      });
    },
  });
  next();
});
