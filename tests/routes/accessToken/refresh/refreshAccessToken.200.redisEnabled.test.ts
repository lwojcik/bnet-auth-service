const fastify = require('fastify');
const fp = require('fastify-plugin');
const server = require('../../../../src/index');

describe('/accessToken/refresh (Redis enabled)', () => {
  jest.mock('ioredis');

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
      connectionString: 'redis://127.0.0.1:6379',
      db: '0',
      replyCachePeriod: 100,
      cacheSegment: 'bas',
    }
  }

  const fastifyServer = fastify();
  fastifyServer.register(server, config);

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  afterAll(async () => {
    await fastifyServer.close();
  });
 
  it('returns 200', async () => {
    const res = await fastifyServer.inject({ method: 'GET', url: '/accessToken/refresh', });
    expect(res.statusCode).toBe(200);
  });


  it('returns correct response', async () => {
    const res = await fastifyServer.inject({ method: 'GET', url: '/accessToken/refresh', });
    expect(JSON.parse(res.payload)).toEqual({ status:200, message: "Access token refreshed successfully"});
  });
});