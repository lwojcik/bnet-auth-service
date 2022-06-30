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

describe('AccessTokenService', () => {
  let service: AccessTokenService;
  let serviceWithBattleNetError: AccessTokenService;

  beforeEach(async () => {
    const moduleFactory: ({
      battleNetError,
    }: {
      battleNetError?: boolean;
    }) => Promise<TestingModule> = ({ battleNetError }) =>
      Test.createTestingModule({
        imports: [
          ConfigModule.forFeature(
            registerAs('redis', () => ({
              enable: false,
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
              getAccessToken: () => 'mocked_access_token_from_battlenet',
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

    service = (await moduleFactory({})).get<AccessTokenService>(
      AccessTokenService
    );

    serviceWithBattleNetError = (
      await moduleFactory({ battleNetError: true })
    ).get<AccessTokenService>(AccessTokenService);
  });

  it('should get access token from Battle.net', async () => {
    expect.assertions(1);
    const accessToken = await service.getAccessToken({});
    expect(accessToken).toMatchSnapshot();
  });

  it('should return access token error from Battle.net', async () => {
    expect.assertions(1);
    const accessToken = await serviceWithBattleNetError.getAccessToken({});
    expect(accessToken).toMatchSnapshot();
  });
});
