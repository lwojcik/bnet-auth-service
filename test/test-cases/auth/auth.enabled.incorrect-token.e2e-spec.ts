import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { unauthorizedResponse } from '../../responses';
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

describe('Authorization enabled (incorrect JWT token)', () => {
  let app: NestFastifyApplication;
  let OLD_ENV: NodeJS.ProcessEnv;

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

  const incorrectJwt =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImluY29ycmVjdF90ZXN0X3VzZXIifQ.NCxZ13IwvAp6v8z5OCgQ9H-V30KadASq0IASdgzmeu0';

  it('/ (GET)', () =>
    app
      .inject({
        method: 'GET',
        url: '/',
        headers: {
          Authorization: `Bearer ${incorrectJwt}`,
        },
      })
      .then((result) => {
        expect(result.statusCode).toEqual(401);
        expect(JSON.parse(result.payload)).toEqual(unauthorizedResponse);
      }));

  it('/status (GET)', () =>
    app
      .inject({
        method: 'GET',
        url: '/status',
        headers: {
          Authorization: `Bearer ${incorrectJwt}`,
        },
      })
      .then((result) => {
        expect(result.statusCode).toEqual(401);
        expect(JSON.parse(result.payload)).toEqual(unauthorizedResponse);
      }));

  it('/accesstoken (GET)', () =>
    app
      .inject({
        method: 'GET',
        url: '/accesstoken',
        headers: {
          Authorization: `Bearer ${incorrectJwt}`,
        },
      })
      .then((result) => {
        expect(result.statusCode).toEqual(401);
        expect(JSON.parse(result.payload)).toEqual(unauthorizedResponse);
      }));

  it('/accesstoken?refresh=true (GET)', () =>
    app
      .inject({
        method: 'GET',
        url: '/accesstoken?refresh=true',
        headers: {
          Authorization: `Bearer ${incorrectJwt}`,
        },
      })
      .then((result) => {
        expect(result.statusCode).toEqual(401);
        expect(JSON.parse(result.payload)).toEqual(unauthorizedResponse);
      }));
});
