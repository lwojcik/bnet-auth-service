import { NestFastifyApplication } from '@nestjs/platform-fastify';
import {
  accessTokenFromApiResponse,
  accessTokenFromCacheResponse,
} from '../../responses';
// import {
//   mainResponse,
//   accessTokenFromApiResponse,
//   statusProperties,
// } from '../../responses';
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

describe('Redis enabled', () => {
  let app: NestFastifyApplication;
  let OLD_ENV;

  beforeAll(async () => {
    OLD_ENV = process.env;

    prepareMinimalSetup();

    setupEnvVariables([
      {
        name: 'BAS_REDIS_ENABLE',
        value: 'true',
      },
      {
        name: 'BAS_REDIS_HOST',
        value: 'redis',
      },
      {
        name: 'BAS_REDIS_PORT',
        value: '6379',
      },
      {
        name: 'BAS_REDIS_TTL_SECS',
        value: '2000',
      },
      {
        name: 'BAS_REDIS_DB',
        value: '0',
      },
      {
        name: 'BAS_REDIS_KEY_PREFIX',
        value: 'bas',
      },
      {
        name: 'BAS_REDIS_KEY_NAME',
        value: 'accesstoken',
      },
    ]);

    app = await createTestServer({
      auth: {
        enable: process.env.BAS_AUTH_ENABLE === 'true',
        username: process.env.BAS_AUTH_USERNAME,
        jwtSecret: process.env.BAS_AUTH_JWT_SECRET,
      },
    });

    await startTestServer(app);
  });

  afterAll(async () => {
    process.env = { ...OLD_ENV };
    await stopTestServer(app);
  });

  it('/accesstoken (GET)', () =>
    app
      .inject({
        method: 'GET',
        url: '/accesstoken',
      })
      .then(async () => {
        await app
          .inject({
            method: 'GET',
            url: '/accesstoken',
          })
          .then((result) => {
            expect(result.statusCode).toEqual(200);
            expect(JSON.parse(result.payload)).toEqual(
              accessTokenFromCacheResponse
            );
          });
      }));

  it('/accesstoken?refresh=true (GET)', () =>
    app
      .inject({
        method: 'GET',
        url: '/accesstoken',
      })
      .then(async () => {
        await app
          .inject({
            method: 'GET',
            url: '/accesstoken',
          })
          .then(async (cachedResult) => {
            const cachedStatusCode = cachedResult.statusCode;
            const cachedPayload = JSON.parse(cachedResult.payload);

            await app
              .inject({
                method: 'GET',
                url: '/accesstoken?refresh=true',
              })
              .then((refreshedResult) => {
                expect(cachedStatusCode).toEqual(200);
                expect(cachedPayload).toEqual(accessTokenFromCacheResponse);

                expect(refreshedResult.statusCode).toEqual(200);
                expect(JSON.parse(refreshedResult.payload)).toEqual(
                  accessTokenFromApiResponse
                );
              });
          });
      }));
});
