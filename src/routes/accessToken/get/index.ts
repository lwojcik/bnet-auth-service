import { FastifyPlugin } from 'fastify';
import fp from 'fastify-plugin';
import schema from './schema';

interface RouteQueryString {
  refresh: boolean;
}

const route: FastifyPlugin = (server, {}, next) => {
  server.get<{
    Querystring: RouteQueryString,
  }>('/accessToken/get', { schema }, async (request, reply) => {
    const { refresh } = request.query;
    const accessToken = await server.accessToken.getAccessToken(refresh);

    if (!accessToken || accessToken.length === 0) {
      reply.code(400).send({
        status: 400,
        message: 'Access token retrieval failed',
      });
    }

    reply.code(200).send({
      status: 200,
      data: {
        accessToken,
      },
    });
  });
  next();
};

export default fp(route);
