import fp from 'fastify-plugin';
import schema from './schema';

export default fp(async (server, {}, next) => {
  server.route({
    schema,
    url: '/accessToken/refresh',
    method: 'GET',
    handler: async ({}, reply) => {
      const accessToken = await server.accessToken.getFreshAccessToken();
      const refreshStatusMessage = server.accessToken.cacheAccessToken(server, accessToken);
      return reply.code(200).send({
        status: 200,
        message: refreshStatusMessage,
      });
    },
  });
  next();
});
