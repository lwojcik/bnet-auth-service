import { NestFastifyApplication } from '@nestjs/platform-fastify';
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

describe('Rate limiting enabled', () => {
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

  it.todo('/ (GET)');
  it.todo('/status (GET)');
  it.todo('/accesstoken (GET)');
  it.todo('/accesstoken?refresh=true (GET)');
});
