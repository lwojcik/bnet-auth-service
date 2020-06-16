import fastify from 'fastify';
import server from '../../src/index';
import getConfig from '../helper';

describe('/status (Redis enabled)', () => {
  const fastifyServer = fastify();

  beforeAll(() => {
    fastifyServer.register(server, getConfig(true));
  });

  afterEach(() => {
    fastifyServer.close();
  });

  it('returns 200', async () => {
    const res = await fastifyServer.inject({ method: 'GET', url: '/status', });
    expect(res.statusCode).toBe(200);
  });

  it('returns correct response', async () => {
    const res = await fastifyServer.inject({
      method: 'GET',
      url: '/status',
    });
    const response = JSON.parse(res.payload);

    expect(response.status).toEqual(200);
    expect(response.message).toEqual('ok');
    expect(response.timestamp.length).toEqual(24);
  });
});

describe('/status (Redis disabled)', () => {
  const fastifyServer = fastify();

  beforeAll(() => {
    fastifyServer.register(server, getConfig(false));
  });

  afterEach(() => {
    fastifyServer.close();
  });

  it('returns 200', async () => {
    const res = await fastifyServer.inject({ method: 'GET', url: '/status', });
    expect(res.statusCode).toBe(200);
  });

  it('returns correct response', async () => {
    const res = await fastifyServer.inject({
      method: 'GET',
      url: '/status',
    });
    const response = JSON.parse(res.payload);

    expect(response.status).toEqual(200);
    expect(response.message).toEqual('ok');
    expect(response.timestamp.length).toEqual(24);
  });
});