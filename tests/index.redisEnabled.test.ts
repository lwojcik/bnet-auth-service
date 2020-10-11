import fastify from 'fastify';
import server from '../src/index';
import getConfig from './helper';

describe('Server (Redis enabled)', () => {
  it('starts and stops without throwing', async () => {
    expect.assertions(1);
    expect(() => {
      const fastifyServer = fastify();
      fastifyServer.register(server, getConfig(true));
    }).not.toThrow();
  });
});
