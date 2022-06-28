import { NestFastifyApplication } from '@nestjs/platform-fastify';
import {
  mainResponse,
  accessTokenFromApiResponse,
  statusProperties,
} from '../../fixtures';
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

// TODO battlenet (configured / unconfigured), redis (on / off), rate-limiting (on /off), https (on / off), cors (on / off)

describe('Authorization disabled', () => {
  let app: NestFastifyApplication;
  let OLD_ENV;

  beforeAll(async () => {
    OLD_ENV = process.env;

    prepareMinimalSetup();

    setupEnvVariables([
      {
        name: 'BAS_AUTH_ENABLE',
        value: 'false',
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

  it('/status (GET)', () =>
    app
      .inject({
        method: 'GET',
        url: '/status',
      })
      .then((result) => {
        expect(result.statusCode).toEqual(200);

        statusProperties.forEach((property) => {
          expect(JSON.parse(result.payload)).toHaveProperty(property);
        });
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

  it('/accesstoken (GET)', () =>
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
