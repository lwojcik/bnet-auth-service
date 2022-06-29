import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { accessTokenFromApiResponse } from '../../responses';
import {
  prepareMinimalSetup,
  setupEnvVariables,
  createTestServer,
  startTestServer,
  stopTestServer,
} from '../../helpers';

jest.mock('ioredis', () => require('ioredis-mock'));

jest.mock('blizzapi', () => ({
  BlizzAPI: jest.fn().mockImplementation(() => ({
    getAccessToken: () =>
      Promise.resolve('sample_access_token_from_mocked_blizzapi'),
  })),
}));

describe('CORS disabled', () => {
  let app: NestFastifyApplication;
  let OLD_ENV;

  beforeAll(async () => {
    OLD_ENV = process.env;

    prepareMinimalSetup();

    setupEnvVariables([
      {
        name: 'BAS_APP_CORS_ENABLE',
        value: 'false',
      },
    ]);

    app = await createTestServer({
      cors: {
        enable: process.env.BAS_APP_CORS_ENABLE === 'true',
      },
    });

    await startTestServer(app);
  });

  afterAll(async () => {
    process.env = { ...OLD_ENV };
    await stopTestServer(app);
  });

  it('/ (GET)', () =>
    app
      .inject({
        method: 'GET',
        url: '/',
      })
      .then((result) => {
        expect(result.headers.origin).toBeUndefined();
        expect(result.headers['access-control-allow-origin']).toBeUndefined();
      }));

  it('/status (GET)', () =>
    app
      .inject({
        method: 'GET',
        url: '/status',
      })
      .then((result) => {
        expect(result.headers.origin).toBeUndefined();
        expect(result.headers['access-control-allow-origin']).toBeUndefined();
      }));

  it('/accesstoken (GET)', () =>
    app
      .inject({
        method: 'GET',
        url: '/accesstoken',
      })
      .then((result) => {
        expect(result.statusCode).toEqual(200);
        expect(JSON.parse(result.payload)).toEqual(accessTokenFromApiResponse);
      }));

  it('/accesstoken?refresh=true (GET)', () =>
    app
      .inject({
        method: 'GET',
        url: '/accesstoken?refresh=true',
      })
      .then((result) => {
        expect(result.statusCode).toEqual(200);
        expect(JSON.parse(result.payload)).toEqual(accessTokenFromApiResponse);
      }));
});
