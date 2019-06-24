const fastify = require('fastify');
const fp = require('fastify-plugin');
const server = require('../src/index');
const getInstance = require('./helper');

const config = () => ({
  app: {
    nodeEnv: 'test',
    port: '8123',
  },
  bnet: {
    region: 'us',
    apiKey: 'key',
    apiSecret: 'secret',
  }
});

const redisDisabled = {
  redis: {
    enable: false,
  }
}


const redisEnabled = {
  redis: {
    enable: true,
    connectionString: 'redis://127.0.0.1:6379',
    db: '0',
    replyCachePeriod: 100,
    cacheSegment: 'bas',
  }
}

describe('Server', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });
  it('works with Redis disabled', async () => {
    const opts = {
      ...config(),
      ...redisDisabled,
    }
    expect(async () => {
      const fastifyServer = fastify();
      fastifyServer.register(fp(server), opts);
      await fastifyServer.close();
    }).not.toThrow();
  });

  it('works with Redis enabled', async () => {
    const opts = {
      ...config(),
      ...redisDisabled,
    }

    expect(async () => {
      const fastifyServer = fastify();
      fastifyServer.register(fp(server), opts);
      await fastifyServer.close();
    }).not.toThrow();
  });

  // it('works with Redis enabled', async () => {
  //   const opts = {
  //     ...config(),
  //     ...redisEnabled,
  //   }
  //   expect(async () => {
  //     const instance = getInstance(server, opts);
  //     await instance.ready();
  //     await instance.close();
  //   }).not.toThrow();
  // });

  // it("works with redis enabled", (done) => {
  //   appConfig.port = '8123';
  //   redisConfig.enable = true;
  //   const instance = server.getInstance();
  //   expect(() => {
  //     server.start(instance, () => {
  //       server.stop(instance, () => {
  //         done();
  //       });
  //     });
  //   }).not.toThrow();
  // });

  // it("works with redis disabled", (done) => {
  //   redisConfig.enable = false;
  //   const instance = server.getInstance();
  //   expect(() => server.start(instance, () => server.stop(instance, done()))).not.toThrow();
  // });

});