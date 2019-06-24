import fp from 'fastify-plugin';
import schema from './schema';

export default fp(async (server, {}, next) => {
  server.route({
    schema,
    url: '/accessToken/get',
    method: 'GET',
    handler: async (request, reply) => {
      const { refresh } = request.query;
      const accessToken = await server.accessToken.getAccessToken(refresh);

      if (!accessToken || accessToken.length <= 0) {
        return reply.code(400).send({
          status: 400,
          message: 'Access token retrieval failed'
        });
      }

      return reply.code(200).send({
        status: 200,
        data: {
          accessToken,
        }
      });

    },
  });
  next();
});
