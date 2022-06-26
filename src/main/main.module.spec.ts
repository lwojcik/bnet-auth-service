import { Test, TestingModule } from '@nestjs/testing';
import { MainModule } from './main.module';

describe('MainModule', () => {
  let mainModule: MainModule;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MainModule],
    }).compile();

    mainModule = module.get<MainModule>(MainModule);
  });

  it('should be defined', () => {
    expect(mainModule).toBeDefined();
  });
});
