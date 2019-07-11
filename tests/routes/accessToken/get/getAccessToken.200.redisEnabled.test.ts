import fastify from 'fastify';
import fastifyRedis from 'fastify-redis-mock';
import server from '../../../../src/index';
import getConfig from '../../../helper';

describe('/accessToken/get 200 (Redis enabled)', () => {
  const fastifyServer = fastify() as any;

  beforeAll(async () => {
    fastifyServer.register(fastifyRedis, {
      host: '127.0.0.1',
      port: '6379',
      password: '',
      enableReadyCheck: true,
      dropBufferSupport: false,
    });
    await fastifyServer.register(server, getConfig(true));
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
    await (fastifyServer as any).redis.set(getConfig(true).redis.cacheSegment, 'sample cached access token');
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

  it('response is cached correctly', async () => {
    await fastifyServer.inject({ method: 'GET', url: '/accessToken/get?refresh=true', });
    const cachedResponse = await fastifyServer.redis.get(getConfig(true).redis.cacheSegment);
    expect(cachedResponse).toEqual("sample access token");
  });
});