import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { mainResponse, statusProperties } from '../../responses';
import {
  prepareMinimalSetup,
  setupEnvVariables,
  createTestServer,
  startTestServer,
  stopTestServer,
} from '../../helpers';

jest.mock('ioredis', () => require('ioredis-mock'));

jest.mock(
  'blizzapi',
  jest.fn().mockImplementation(() => ({
    BlizzAPI: function BlizzAPI() {
      return {
        getAccessToken: () => ({
          error: 'BnetApiError',
          message: 'Request failed with status code 401',
          statusCode: 401,
        }),
      };
    },
  }))
);

describe('Battle.net API (incorrect config)', () => {
  let app: NestFastifyApplication;
  let OLD_ENV;

  beforeAll(async () => {
    OLD_ENV = process.env;

    prepareMinimalSetup();

    setupEnvVariables([
      {
        name: 'BAS_BATTLENET_REGION',
        value: undefined,
      },
      {
        name: 'BAS_BATTLENET_CLIENT_ID',
        value: undefined,
      },
      {
        name: 'BAS_BATTLENET_CLIENT_SECRET',
        value: undefined,
      },
    ]);

    app = await createTestServer({
      battlenet: {
        region: process.env.BAS_BATTLENET_REGION,
        clientId: process.env.BAS_BATTLENET_CLIENT_ID,
        clientSecret: process.env.BAS_BATTLENET_CLIENT_SECRET,
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
        expect(JSON.parse(result.payload).error).toEqual('BnetApiError');
        expect(JSON.parse(result.payload).message).toEqual(
          'Request failed with status code 401'
        );
        expect(JSON.parse(result.payload).statusCode).toEqual(401);
        expect(JSON.parse(result.payload)).toHaveProperty('id');
      }));

  it('/accesstoken?refresh=true (GET)', () =>
    app
      .inject({
        method: 'GET',
        url: '/accesstoken?refresh=true',
      })
      .then((result) => {
        expect(result.statusCode).toEqual(200);
        expect(JSON.parse(result.payload).error).toEqual('BnetApiError');
        expect(JSON.parse(result.payload).message).toEqual(
          'Request failed with status code 401'
        );
        expect(JSON.parse(result.payload).statusCode).toEqual(401);
        expect(JSON.parse(result.payload)).toHaveProperty('id');
      }));
});
