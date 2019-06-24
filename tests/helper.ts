const fastify = require('fastify');
import { Plugin } from 'fastify';

const getInstance = (server: Plugin<any, any, any, any>, config: any) =>  {
  const fastifyServer = fastify();
  fastifyServer.register(server, config);
  return fastifyServer;
};

module.exports = getInstance;