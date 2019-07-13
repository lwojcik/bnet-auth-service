import fastify from 'fastify';
import fastifyRedis from 'fastify-redis-mock';
import server from '../../../../src/index';

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
    replyCachePeriod: 100,
    host: '127.0.0.1',
    port: '6379',
    db: '0',
    password: '',
    enableReadyCheck: true,
    dropBufferSupport: false,
  }
}

const { BlizzAPI } = require('blizzapi');
BlizzAPI.prototype.getAccessToken = () => '';

describe('/accessToken/get 400 (Redis disabled)', () => {
  const fastifyServer = fastify();

  beforeAll(() => {
    fastifyServer.register(fastifyRedis, {
      host: '127.0.0.1',
      port: '6379',
      password: '',
      enableReadyCheck: true,
      dropBufferSupport: false,
    });
    fastifyServer.register(server, config);
  });

  afterAll(() => fastifyServer.close());

  it('returns 400', async () => {
    const res = await fastifyServer.inject({ method: 'GET', url: '/accessToken/get', });
    expect(res.statusCode).toBe(400);
  });

  it('returns correct response', async () => {
    const res = await fastifyServer.inject({ method: 'GET', url: '/accessToken/get', });
    expect(JSON.parse(res.payload)).toEqual({"status":400});
  });
});