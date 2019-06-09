import fp from 'fastify-plugin';

export default fp(async (server, {}, next) => {
  server.route({
    url: '/accessToken/check',
    method: 'GET',
    handler: async ({}, reply) => {
      // get token
      // check token
      // if ok return ok
      // else fetch and save new one
      return reply.code(200).send({
        status: 200,
        data: {
          access_token: 'access token here',
        },
      });
    },
  });
  next();
});
