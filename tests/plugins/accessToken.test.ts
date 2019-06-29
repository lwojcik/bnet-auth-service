import fastify from 'fastify';
import server from '../../src/index';
import getConfig from '../helper';

describe('AccessToken plugin', () => {
  const fastifyServer = fastify() as any;

  beforeAll(async () => {
    fastifyServer.register(server, getConfig(false));
    await fastifyServer.ready();
  });

  it('is registered', async () => {
    expect(typeof fastifyServer.accessToken).toBe("object");
  });

  it('exposes getAccessToken() method', async () => {
    expect(typeof fastifyServer.accessToken.getAccessToken).toBe("function");
  });

  it('exposes getFreshAccessToken() method', async () => {
    expect(typeof fastifyServer.accessToken.getFreshAccessToken).toBe("function");
  });

  it('exposes getCachedAccessToken() method', async () => {
    expect(typeof fastifyServer.accessToken.getCachedAccessToken).toBe("function");
  });

  it('exposes isAccessTokenCached() method', async () => {
    expect(typeof fastifyServer.accessToken.isAccessTokenCached).toBe("function");
  });

  it('exposes cacheAccessToken() method', async () => {
    expect(typeof fastifyServer.accessToken.cacheAccessToken).toBe("function");
  });
});