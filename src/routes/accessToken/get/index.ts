import fp from 'fastify-plugin';

export default fp(async (server, {}, next) => {
  server.route({
    url: '/accessToken/get',
    method: 'GET',
    // schema,
    // preHandler: (request, reply, done) => {
    //   const { channelId } = request.params;
    //   const { token } = request.headers;
    //   const validRequest = server.twitchEbs.validatePermission(token, channelId, ['viewer', 'broadcaster']);

    //   if (validRequest) {
    //     done();
    //   } else {
    //     server.log.error('invalid request');
    //     reply.code(400).send({
    //       status: 400,
    //       message: 'Bad request',
    //     });
    //   }
    // },
    handler: async ({}, reply) => {
      return reply.code(200).send({
        status: 200,
        data: {
          access_token: 'get access token',
        },
      });
    },
  });
  next();
});
