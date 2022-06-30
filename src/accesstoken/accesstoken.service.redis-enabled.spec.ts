import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, registerAs } from '@nestjs/config';
import { CacheService } from '../cache/cache.service';
import { BattleNetService } from '../battlenet/battlenet.service';
import { AccessTokenService } from './accesstoken.service';
import { LoggerService } from '../logger/logger.service';

jest.mock(
  'nestjs-request-context',
  jest.fn().mockReturnValue({
    RequestContext: {
      currentContext: {
        req: {
          id: 'sample_mocked_request_id',
        },
      },
    },
  })
);

// eslint-disable-next-line global-require
jest.mock('ioredis', () => require('ioredis-mock'));

describe('AccessTokenService (Cache enabled)', () => {
  let serviceWithWarmCache: AccessTokenService;
  let serviceWithEmptyCache: AccessTokenService;
  let serviceWithBattleNetError: AccessTokenService;

  beforeEach(async () => {
    const moduleFactory: ({
      accessTokenInCache,
      battleNetError,
    }: {
      accessTokenInCache?: string;
      battleNetError?: boolean;
    }) => Promise<TestingModule> = ({ accessTokenInCache, battleNetError }) =>
      Test.createTestingModule({
        imports: [
          ConfigModule.forFeature(
            registerAs('redis', () => ({
              enable: true,
            }))
          ),
        ],
        providers: [
          {
            provide: BattleNetService,
            useValue: {
              getAccessToken: () =>
                battleNetError
                  ? {
                      error: 'Mocked error response',
                      statusCode: 'Mocked error status code',
                    }
                  : 'mocked_access_token_from_battlenet',
            },
          },
          {
            provide: CacheService,
            useValue: {
              getAccessToken: () => accessTokenInCache || null,
              saveAccessToken: jest.fn(),
            },
          },
          {
            provide: LoggerService,
            useValue: {
              debug: jest.fn(),
              log: jest.fn(),
              error: jest.fn(),
              setLoggedClass: jest.fn(),
              setLoggedMethod: jest.fn(),
            },
          },
          AccessTokenService,
        ],
      }).compile();

    serviceWithWarmCache = (
      await moduleFactory({
        accessTokenInCache: 'test_access_token_from_redis_cache',
      })
    ).get<AccessTokenService>(AccessTokenService);

    serviceWithEmptyCache = (await moduleFactory({})).get<AccessTokenService>(
      AccessTokenService
    );

    serviceWithBattleNetError = (
      await moduleFactory({ battleNetError: true })
    ).get<AccessTokenService>(AccessTokenService);
  });

  describe('Access token saved in cache', () => {
    it('should get access token from cache', async () => {
      expect.assertions(1);
      const accessToken = await serviceWithWarmCache.getAccessToken({});
      expect(accessToken).toMatchSnapshot();
    });

    it('should get access token from Battle.net when refresh is true', async () => {
      expect.assertions(1);
      const accessToken = await serviceWithWarmCache.getAccessToken({
        refresh: true,
      });
      expect(accessToken).toMatchSnapshot();
    });
  });

  describe('No access token saved in cache', () => {
    it('should get access token from Battle.net', async () => {
      expect.assertions(1);
      const accessToken = await serviceWithEmptyCache.getAccessToken({});
      expect(accessToken).toMatchSnapshot();
    });

    it('should return access token error if Battle.net API returns an error', async () => {
      expect.assertions(1);
      const accessToken = await serviceWithBattleNetError.getAccessToken({});
      expect(accessToken).toMatchSnapshot();
    });

    it('should get access token from Battle.net if refresh is set to true', async () => {
      expect.assertions(1);
      const accessToken = await serviceWithEmptyCache.getAccessToken({
        refresh: true,
      });
      expect(accessToken).toMatchSnapshot();
    });
  });
});
