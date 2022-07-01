import { Test, TestingModule } from '@nestjs/testing';
import { StatusModule } from './status.module';

describe('StatusModule', () => {
  let statusModule: StatusModule;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [StatusModule],
    }).compile();

    statusModule = module.get<StatusModule>(StatusModule);
  });

  it('should be defined', () => {
    expect(statusModule).toBeDefined();
  });
});
