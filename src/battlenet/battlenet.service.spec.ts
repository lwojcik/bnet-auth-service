import { Test, TestingModule } from '@nestjs/testing';
import { BattleNetService } from './battlenet.service';

describe('BattleNetService', () => {
  let service: BattleNetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BattleNetService],
    }).compile();

    service = module.get<BattleNetService>(BattleNetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
