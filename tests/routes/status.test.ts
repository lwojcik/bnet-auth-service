const fastify = require('fastify');
const fp = require('fastify-plugin');
const server = require('../../src/index');

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

const redisEnabled = {
  redis: {
    enable: true,
    connectionString: 'redis://127.0.0.1:6379',
    db: '0',
    replyCachePeriod: 100,
    cacheSegment: 'bas',
  }
}

describe('/status (Redis enabled)', () => {
  const fastifyServer = fastify();

  beforeAll(() => {
    fastifyServer.register(server, { ...config, ...redisEnabled });
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  afterEach(() => {
    fastifyServer.close();
  });

  
  it('returns 200', async () => {
    const res = await fastifyServer.inject({ method: 'GET', url: '/status', });
    expect(res.statusCode).toBe(200);
  });

  it('returns correct response', async () => {
    const res = await fastifyServer.inject({ method: 'GET', url: '/status', });
    expect(JSON.parse(res.payload)).toStrictEqual({ status: 200, message: 'ok' });
  });
});

describe('/status (Redis disabled)', () => {
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
    const res = await fastifyServer.inject({ method: 'GET', url: '/status', });
    expect(res.statusCode).toBe(200);
  });

  it('returns correct response', async () => {
    const res = await fastifyServer.inject({ method: 'GET', url: '/status', });
    expect(JSON.parse(res.payload)).toStrictEqual({ status: 200, message: 'ok' });
  });
});