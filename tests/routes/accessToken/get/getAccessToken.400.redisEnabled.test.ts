import fastify from 'fastify';
import fastifyRedis from 'fastify-redis-mock';
import BlizzAPI from 'blizzapi';
import server from '../../../../src/index';
import getConfig from '../../../helper';

BlizzAPI.prototype.getAccessToken = () => Promise.resolve('');

describe('/accessToken/get 400 (Redis enabled)', () => {
  const fastifyServer = fastify() as any;

  beforeAll(() => {
    fastifyServer.register(fastifyRedis, {
      host: '127.0.0.1',
      port: '6379',
      password: '',
      enableReadyCheck: true,
      dropBufferSupport: false,
    });
    fastifyServer.register(server, getConfig(true));
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

  it('response is not cached', async () => {
    expect.assertions(1);

    await fastifyServer.inject({
      method: 'GET',
      url: '/accessToken/get?refresh=true',
    });

    const cachedResponse = await fastifyServer.redis.get(
      getConfig(true).redis.cacheSegment,
    );

    expect(cachedResponse).toBeFalsy();
  });
});
