const fastify = require('fastify');
const server = require('../src/index');

describe('Server (Redis disabled)', () => {
  const config = {
    app: {
      nodeEnv: 'test',
      port: '8123',
    },
    bnet: {
      region: 'us',
      apiKey: 'key',
      apiSecret: 'secret',
    },
    redis: {
      enable: false,
    }
  }
  
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  it('starts and stops without throwing', async () => {
    const opts = config;

    expect(async () => {
      const fastifyServer = fastify();
      fastifyServer.register(server, opts);
      await fastifyServer.close();
    }).not.toThrow();
  });
});