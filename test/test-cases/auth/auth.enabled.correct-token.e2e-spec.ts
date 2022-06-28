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

describe('Authorization enabled (correct JWT token)', () => {
  let app: NestFastifyApplication;
  let OLD_ENV;

  beforeAll(async () => {
    OLD_ENV = process.env;

    prepareMinimalSetup();

    setupEnvVariables([
      {
        name: 'BAS_AUTH_ENABLE',
        value: 'true',
      },
      {
        name: 'BAS_AUTH_USERNAME',
        value: 'test_user',
      },
      {
        name: 'BAS_AUTH_JWT_SECRET',
        value: 'test_jwt_secret',
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

  const correctJwt =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RfdXNlciJ9.JHLBIx8oU_0fp_in1iy_DKYAJ4sO5EvlexoJq7JhIbI';

  it('/ (GET)', () =>
    app
      .inject({
        method: 'GET',
        url: '/',
        headers: {
          Authorization: `Bearer ${correctJwt}`,
        },
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
        headers: {
          Authorization: `Bearer ${correctJwt}`,
        },
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
        headers: {
          Authorization: `Bearer ${correctJwt}`,
        },
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
        headers: {
          Authorization: `Bearer ${correctJwt}`,
        },
      })
      .then((result) => {
        expect(result.statusCode).toEqual(200);
        expect(JSON.parse(result.payload)).toEqual(accessTokenFromApiResponse);
      }));
});
