import fp from "fastify-plugin";
import schema from "./schema";

export default fp((server, {}, next) => {
  server.route({
    schema,
    url: "/status",
    method: "GET",
    handler: async ({}, reply) => {
      return reply.code(200).send({
        status: 200,
        message: "ok"
      });
    }
  });
  next();
});
