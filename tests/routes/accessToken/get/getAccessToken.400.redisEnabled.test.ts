
const fastify = require('fastify');
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
    enable: true,
    cacheSegment: 'test',
    replyCachePeriod: 100
  }
}

const { BlizzAPI } = require('blizzapi');
BlizzAPI.prototype.getAccessToken = () => '';

describe('/accessToken/get 400 (Redis enabled)', () => {
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

  it('returns 400', async () => {
    const res = await fastifyServer.inject({ method: 'GET', url: '/accessToken/get', });
    expect(res.statusCode).toBe(400);
  });

  it('returns correct response', async () => {
    const res = await fastifyServer.inject({ method: 'GET', url: '/accessToken/get', });
    expect(JSON.parse(res.payload)).toEqual({"status":400});
  });
});