import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { accessTokenFromApiResponse, mainResponse } from '../../responses';
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

describe('Redis disabled', () => {
  let app: NestFastifyApplication;
  let OLD_ENV;

  beforeEach(async () => {
    OLD_ENV = process.env;

    prepareMinimalSetup();

    setupEnvVariables([
      {
        name: 'BAS_REDIS_ENABLE',
        value: 'false',
      },
    ]);

    app = await createTestServer({
      redis: {
        enable: process.env.BAS_REDIS_ENABLE === 'true',
      },
    });

    await startTestServer(app);
  });

  afterEach(async () => {
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
        expect(result.statusCode).toEqual(200);
        expect(JSON.parse(result.payload)).toEqual(mainResponse);
      }));

  it('/accesstoken (GET)', () =>
    app
      .inject({
        method: 'GET',
        url: '/accesstoken',
      })
      .then(async (firstResult) => {
        await app
          .inject({
            method: 'GET',
            url: '/accesstoken',
          })
          .then((secondResult) => {
            expect(firstResult.statusCode).toEqual(200);
            expect(JSON.parse(firstResult.payload)).toEqual(
              accessTokenFromApiResponse
            );

            expect(secondResult.statusCode).toEqual(200);
            expect(JSON.parse(secondResult.payload)).toEqual(
              accessTokenFromApiResponse
            );
          });
      }));

  it('/accesstoken?refresh=true (GET)', () =>
    app
      .inject({
        method: 'GET',
        url: '/accesstoken?refresh=true',
      })
      .then(async (firstResult) => {
        await app
          .inject({
            method: 'GET',
            url: '/accesstoken',
          })
          .then((secondResult) => {
            expect(firstResult.statusCode).toEqual(200);
            expect(JSON.parse(firstResult.payload)).toEqual(
              accessTokenFromApiResponse
            );

            expect(secondResult.statusCode).toEqual(200);
            expect(JSON.parse(secondResult.payload)).toEqual(
              accessTokenFromApiResponse
            );
          });
      }));
});
