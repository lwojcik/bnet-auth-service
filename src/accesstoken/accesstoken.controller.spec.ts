import { Test, TestingModule } from '@nestjs/testing';
import { LoggerService } from '../logger/logger.service';
import { AccessTokenController } from './accesstoken.controller';
import { AccessTokenService } from './accesstoken.service';

describe('AccessTokenController', () => {
  let controller: AccessTokenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: AccessTokenService,
          useFactory: jest.fn(),
        },
        {
          provide: LoggerService,
          useFactory: jest.fn(),
        },
      ],
      controllers: [AccessTokenController],
    }).compile();

    controller = module.get<AccessTokenController>(AccessTokenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
