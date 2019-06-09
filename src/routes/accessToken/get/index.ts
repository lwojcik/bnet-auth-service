import fp from 'fastify-plugin';

export default fp(async (server, {}, next) => {
  server.route({
    url: '/accessToken/get',
    method: 'GET',
    handler: async ({}, reply) => {
      // if its in redis return key from redis
      // else fetch from api and save to redis
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
