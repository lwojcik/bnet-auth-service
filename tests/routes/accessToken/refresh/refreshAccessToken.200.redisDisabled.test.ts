const fastify = require('fastify');
const fp = require('fastify-plugin');
const fastifyRedis = require('fastify-redis-mock');
const server = require('../../../../src/index');

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
    cacheSegment: 'test',
    replyCachePeriod: 100
  }
}

describe('/accessToken/refresh (Redis disabled)', () => {
  const fastifyServer = fastify();

  beforeAll(async () => {
    fastifyServer.register(fastifyRedis, {
      host: '127.0.0.1',
      port: '6379',
      password: '',
      enableReadyCheck: true,
      dropBufferSupport: false,
    });
    fastifyServer.register(server, config);
  });

  afterEach(() => {
    fastifyServer.close();
  });
 
  it('returns 200', async () => {
    const res = await fastifyServer.inject({ method: 'GET', url: '/accessToken/refresh', });
    expect(res.statusCode).toBe(200);
  });

  it('returns correct response', async () => {
    const res = await fastifyServer.inject({ method: 'GET', url: '/accessToken/refresh', });
    expect(JSON.parse(res.payload)).toEqual({ status:200, message: "Access token not refreshed (Redis disabled)"});
  });
});
