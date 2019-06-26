const fastify = require('fastify');
const server = require('../src/index');

describe('Server (Redis enabled)', () => {
  const config = {
    app: {
      nodeEnv: 'production',
      port: '8123',
    },
    bnet: {
      region: 'us',
      apiKey: 'key',
      apiSecret: 'secret',
    },
    redis: {
      enable: true,
    }
  }
  it('starts and stops without throwing', async () => {
    const opts = config;

    expect(() => {
      const fastifyServer = fastify();
      fastifyServer.register(server, opts);
    }).not.toThrow();
  });
});