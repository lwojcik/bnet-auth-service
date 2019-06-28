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

describe('/accessToken/get 200 (Redis enabled)', () => {
  const fastifyServer = fastify();

  beforeAll(async () => {
    fastifyServer.register(fastifyRedis, {
      host: '127.0.0.1',
      port: '6379',
      password: '',
      enableReadyCheck: true,
      dropBufferSupport: false,
    });
    await fastifyServer.register(server, config);
  });

  afterAll(() => {
    fastifyServer.close();
  });

  it('returns 200', async () => {
    const res = await fastifyServer.inject({ method: 'GET', url: '/accessToken/get', });
    expect(res.statusCode).toBe(200);
  });

  it('returns correct response', async () => {
    const res = await fastifyServer.inject({ method: 'GET', url: '/accessToken/get', });
    expect(JSON.parse(res.payload)).toEqual({"status":200,"data":{ accessToken: "sample access token" }});
  });

  it('returns correct response when access token is cached', async () => {
    await fastifyServer.redis.set(config.redis.cacheSegment, 'sample cached access token');
    const res = await fastifyServer.inject({ method: 'GET', url: '/accessToken/get', });
    expect(JSON.parse(res.payload)).toEqual({"status":200,"data":{ accessToken: "sample cached access token" }});
  });

  it('returns 200 when refresh parameter is sent', async () => {
    const res = await fastifyServer.inject({ method: 'GET', url: '/accessToken/get?refresh=true', });
    expect(res.statusCode).toBe(200);
  });

  it('returns correct response refresh parameter is sent', async () => {
    const res = await fastifyServer.inject({ method: 'GET', url: '/accessToken/get?refresh=true', });
    expect(JSON.parse(res.payload)).toEqual({"status":200,"data":{ accessToken: "sample access token" }});
  });
});