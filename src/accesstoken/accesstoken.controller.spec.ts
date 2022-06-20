import { Test, TestingModule } from '@nestjs/testing';
import { AccessTokenController } from './accesstoken.controller';

describe('AccesstokenController', () => {
  let controller: AccessTokenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccessTokenController],
    }).compile();

    controller = module.get<AccessTokenController>(AccessTokenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
