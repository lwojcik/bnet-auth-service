import { FastifyPlugin } from 'fastify';
import fp from 'fastify-plugin';
import schema from './schema';

const route: FastifyPlugin = (server, {}, next) => {
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
