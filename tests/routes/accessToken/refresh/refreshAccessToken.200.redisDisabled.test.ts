const fastify = require('fastify');
const fp = require('fastify-plugin');
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
  }
}

const redisDisabled = {
  redis: {
    enable: false,
  }
}

describe('/accessToken/refresh (Redis disabled)', () => {
  const fastifyServer = fastify();

  beforeAll(() => {
    fastifyServer.register(server, { ...config, ...redisDisabled });
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
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
