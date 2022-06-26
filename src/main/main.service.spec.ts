import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { endpointsConfig, redisConfig } from '../config';
import { LoggerService } from '../logger/logger.service';
import { MainService } from './main.service';

describe('MainService', () => {
  let service: MainService;
  let logger: LoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forFeature(endpointsConfig),
        ConfigModule.forFeature(redisConfig),
      ],
      providers: [
        {
          provide: LoggerService,
          useValue: {
            debug: jest.fn(),
            error: jest.fn(),
            log: jest.fn(),
            setLoggedClass: jest.fn(),
            setLoggedMethod: jest.fn(),
          },
        },
        MainService,
      ],
    }).compile();

    service = module.get<MainService>(MainService);
    logger = module.get<LoggerService>(LoggerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get status', () => {
    expect(service.getMain()).toMatchSnapshot();
  });

  it('should generate logs', () => {
    service.getMain();
    expect(logger.setLoggedClass).toHaveBeenCalledWith(MainService.name);
    expect(logger.setLoggedMethod).toHaveBeenCalledWith(
      MainService.prototype.getMain.name
    );
    expect(logger.debug).toHaveBeenCalledTimes(1);
  });
});
