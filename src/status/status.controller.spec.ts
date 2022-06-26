import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { LoggerService } from '../logger/logger.service';
import { authConfig } from '../config';
import { LoggerModule } from '../logger/logger.module';
import { StatusController } from './status.controller';
import { StatusService } from './status.service';

describe('StatusController', () => {
  let controller: StatusController;
  let logger: LoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule, ConfigModule.forFeature(authConfig)],
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
        {
          provide: StatusService,
          useValue: {
            getStatus: jest.fn().mockImplementation(() => ({
              testStatusProperty: 'testStatusValue',
            })),
          },
        },
      ],
      controllers: [StatusController],
    }).compile();

    controller = module.get<StatusController>(StatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get status', () => {
    expect(controller.getStatus()).toMatchSnapshot();
  });

  it('should generate logs', () => {
    controller.getStatus();
    expect(logger.setLoggedClass).toHaveBeenCalledWith(StatusController.name);
    expect(logger.setLoggedMethod).toHaveBeenCalledWith(
      StatusController.prototype.getStatus.name
    );
    expect(logger.debug).toHaveBeenCalledTimes(1);
  });
});
