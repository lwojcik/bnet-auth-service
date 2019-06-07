import fp from 'fastify-plugin';
import schema from './schema';
import { BlizzAPI } from 'blizzapi';

import bnetConfig from '../../../config/bnet';

const { region, apiKey, apiSecret } = bnetConfig;

export default fp(async (server, {}, next) => {
  server.route({
    schema,
    url: '/accessToken/fetch',
    method: 'GET',
    handler: async ({}, reply) => {
      const blizzAPI = new BlizzAPI(region, apiKey, apiSecret);
      const accessToken = await blizzAPI.getAccessToken();

      if (!accessToken) {
        return reply.code(400).send({
          status: 400,
          message: 'Error fetching access token',
        });
      }

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
