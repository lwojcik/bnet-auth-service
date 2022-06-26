import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { LoggerService } from '../logger/logger.service';
import { battleNetConfig } from '../config';
import { BattleNetService } from './battlenet.service';

describe('BattleNetService', () => {
  let service: BattleNetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(battleNetConfig)],
      providers: [
        {
          provide: LoggerService,
          useValue: {
            debug: jest.fn(),
            log: jest.fn(),
            setLoggedClass: jest.fn(),
            setLoggedMethod: jest.fn(),
          },
        },
        BattleNetService,
      ],
    }).compile();

    service = module.get<BattleNetService>(BattleNetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should implement getAccessToken()', () => {
    expect(service.getAccessToken).toBeDefined();
  });
});
