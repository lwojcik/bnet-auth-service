import fp from 'fastify-plugin';
import schema from './schema';

export default fp((server, {}, next) => {
  server.get('/status', { schema }, ({}, reply) => {
    reply.code(200).send({
      status: 200,
      message: 'ok',
      timestamp: new Date(),
    });
  });
  next();
});
