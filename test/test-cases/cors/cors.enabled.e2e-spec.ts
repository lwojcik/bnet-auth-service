import { NestFastifyApplication } from '@nestjs/platform-fastify';
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
  let OLD_ENV: NodeJS.ProcessEnv;

  const testOrigin = 'http://some-foreign-testing-origin.tld';

  beforeAll(async () => {
    OLD_ENV = process.env;

    prepareMinimalSetup();

    setupEnvVariables([
      {
        name: 'BAS_APP_CORS_ENABLE',
        value: 'true',
      },
      {
        name: 'BAS_APP_CORS_ORIGIN',
        value: testOrigin,
      },
    ]);

    app = await createTestServer({
      cors: {
        enable: process.env.BAS_APP_CORS_ENABLE === 'true',
        origin: process.env.BAS_APP_CORS_ORIGIN,
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
        expect(result.headers['access-control-allow-origin']).toEqual(
          testOrigin
        );
        expect(result.headers.vary).toEqual('Origin');
      }));

  it('/status (GET)', () =>
    app
      .inject({
        method: 'GET',
        url: '/status',
      })
      .then((result) => {
        expect(result.headers['access-control-allow-origin']).toEqual(
          testOrigin
        );
        expect(result.headers.vary).toEqual('Origin');
      }));

  it('/accesstoken (GET)', () =>
    app
      .inject({
        method: 'GET',
        url: '/accesstoken',
      })
      .then((result) => {
        expect(result.headers['access-control-allow-origin']).toEqual(
          testOrigin
        );
        expect(result.headers.vary).toEqual('Origin');
      }));

  it('/accesstoken?refresh=true (GET)', () =>
    app
      .inject({
        method: 'GET',
        url: '/accesstoken?refresh=true',
      })
      .then((result) => {
        expect(result.headers['access-control-allow-origin']).toEqual(
          testOrigin
        );
        expect(result.headers.vary).toEqual('Origin');
      }));
});
