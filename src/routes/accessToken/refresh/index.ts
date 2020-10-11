import { FastifyPluginCallback } from 'fastify';
import fp from 'fastify-plugin';
import schema from './schema';

// eslint-disable-next-line no-empty-pattern
const route: FastifyPluginCallback = (server, {}, next) => {
  // eslint-disable-next-line no-empty-pattern
  server.get('/accessToken/refresh', { schema }, async ({}, reply) => {
    const accessToken = await server.accessToken.getFreshAccessToken();
    const refreshStatusMessage = await server.accessToken.cacheAccessToken(
      accessToken,
    );
    reply.code(200).send({
      status: 200,
      message: refreshStatusMessage,
    });
  });
  next();
};

export default fp(route);
