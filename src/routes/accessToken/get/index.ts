import { FastifyPluginCallback } from 'fastify';
import fp from 'fastify-plugin';
import schema from './schema';

interface RouteQueryString {
  refresh: boolean;
}

// eslint-disable-next-line no-empty-pattern
const route: FastifyPluginCallback = (server, {}, next) => {
  server.get<{
    Querystring: RouteQueryString,
  }>('/accessToken/get', { schema }, async (request, reply) => {
    const { refresh } = request.query;
    const accessToken = await (server as any).accessToken.getAccessToken(refresh);

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
