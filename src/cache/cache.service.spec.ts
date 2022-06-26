import { RedisService } from '@liaoliaots/nestjs-redis';
import { ConfigModule, registerAs } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { LoggerService } from '../logger/logger.service';
import { CacheService } from './cache.service';

describe('CacheService', () => {
  let service: CacheService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forFeature(
          registerAs('redis', () => ({
            enable: true,
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

    service = module.get<CacheService>(CacheService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get access token', async () => {
    expect.assertions(1);
    const accessToken = await service.getAccessToken();
    expect(accessToken).toMatchSnapshot();
  });
});
