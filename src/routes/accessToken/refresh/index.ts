/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyPluginCallback } from "fastify";
import fp from "fastify-plugin";
import schema from "./schema";

// eslint-disable-next-line no-empty-pattern
const route: FastifyPluginCallback = (server, {}, next) => {
  // eslint-disable-next-line no-empty-pattern
  server.get("/accessToken/refresh", { schema }, async ({}, reply) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const accessToken = await (server as any).accessToken.getFreshAccessToken();
    const refreshStatusMessage = await (
      server as any
    ).accessToken.cacheAccessToken(accessToken);
    reply.code(200).send({
      status: 200,
      message: refreshStatusMessage,
    });
  });
  next();
};

// eslint-disable-next-line import/no-default-export
export default fp(route);
