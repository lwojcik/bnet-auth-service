import fastify from 'fastify';
import { RegionIdOrName } from 'blizzapi';
import fastifyRedis from 'fastify-redis-mock';
import server from '../../../../src/index';

jest.mock('blizzapi', () => ({
  BlizzAPI: jest.fn().mockImplementation(() => ({
    getAccessToken: () => Promise.resolve(''),
  })),
}));

const config = {
  app: {
    nodeEnv: 'test',
    port: '8123',
  },
  bnet: {
    region: 'us' as RegionIdOrName,
    clientId: 'key',
    clientSecret: 'secret',
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
  },
};

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
    expect.assertions(1);

    const res = await fastifyServer.inject({
      method: 'GET',
      url: '/accessToken/get',
    });

    expect(res.statusCode).toBe(400);
  });

  it('returns correct response', async () => {
    expect.assertions(1);

    const res = await fastifyServer.inject({
      method: 'GET',
      url: '/accessToken/get',
    });

    expect(res.payload).toMatchSnapshot();
  });
});
