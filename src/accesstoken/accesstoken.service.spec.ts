import { Test, TestingModule } from '@nestjs/testing';
import { CacheService } from '../cache/cache.service';
import { BattleNetService } from '../battlenet/battlenet.service';
import { AccessTokenService } from './accesstoken.service';
import { LoggerService } from '../logger/logger.service';

describe('AccessTokenService', () => {
  let service: AccessTokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: BattleNetService,
          useValue: {
            getAccessToken: jest.fn(),
          },
        },
        {
          provide: CacheService,
          useValue: {
            getAccessToken: jest.fn(),
            saveAccessToken: jest.fn(),
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
        AccessTokenService,
      ],
    }).compile();

    service = module.get<AccessTokenService>(AccessTokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
