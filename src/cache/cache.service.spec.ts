import { RedisService } from '@liaoliaots/nestjs-redis';
import { ConfigModule, registerAs } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { LoggerService } from '../logger/logger.service';
import { CacheService } from './cache.service';

describe('CacheService', () => {
  let serviceWithRedisEnabled: CacheService;
  let serviceWithRedisDisabled: CacheService;

  beforeEach(async () => {
    const moduleFactory: (redisEnabled: boolean) => Promise<TestingModule> = (
      redisEnabled: boolean
    ) =>
      Test.createTestingModule({
        imports: [
          ConfigModule.forFeature(
            registerAs('redis', () => ({
              enable: redisEnabled,
              host: 'test-redis-host',
              port: '1234',
              password: 'test-password',
              ttlSecs: 10,
              db: 0,
              keyName: 'testkeyname',
              keyPrefix: 'testkeyprefix',
            }))
          ),
        ],
        providers: [
          {
            provide: RedisService,
            useValue: {
              getClient: () => ({
                get: jest
                  .fn()
                  .mockImplementation(
                    () => 'sample_access_token_from_mocked_redis_cache'
                  ),
                set: jest.fn(),
              }),
            },
          },
          {
            provide: LoggerService,
            useValue: {
              debug: jest.fn(),
              log: jest.fn(),
              setLoggedClass: jest.fn(),
              setLoggedMethod: jest.fn(),
            },
          },
          CacheService,
        ],
      }).compile();

    serviceWithRedisEnabled = (await moduleFactory(true)).get<CacheService>(
      CacheService
    );

    serviceWithRedisDisabled = (await moduleFactory(false)).get<CacheService>(
      CacheService
    );
  });

  it('should be defined', () => {
    expect(serviceWithRedisEnabled).toBeDefined();
  });

  it('should get access token', async () => {
    expect.assertions(1);
    const accessToken = await serviceWithRedisEnabled.getAccessToken();
    expect(accessToken).toMatchSnapshot();
  });

  it('should save access token', async () => {
    expect.assertions(1);
    expect(async () => {
      await serviceWithRedisEnabled.saveAccessToken('sample_access_token');
    }).not.toThrow();
  });

  it('should not save access token if Redis is disabled', () => {
    expect(() => {
      serviceWithRedisDisabled.saveAccessToken('sample_access_token');
    }).not.toThrow();
  });

  it('should get "null" as access token if Redis is disabled', async () => {
    expect.assertions(1);
    const accessToken = await serviceWithRedisDisabled.getAccessToken();
    expect(accessToken).toBeNull();
  });
});
