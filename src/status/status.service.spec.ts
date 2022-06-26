import { Test, TestingModule } from '@nestjs/testing';
import { LoggerService } from '../logger/logger.service';
import { StatusService } from './status.service';

describe('StatusService', () => {
  let service: StatusService;
  let logger: LoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: LoggerService,
          useValue: {
            debug: jest.fn(),
            log: jest.fn(),
            error: jest.fn(),
            setLoggedClass: jest.fn(),
            setLoggedMethod: jest.fn(),
          },
        },
        StatusService,
      ],
    }).compile();

    service = module.get<StatusService>(StatusService);
    logger = module.get<LoggerService>(LoggerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return status response', () => {
    jest.spyOn(process, 'uptime').mockImplementation(() => 128);
    jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));

    expect(service.getStatus()).toMatchSnapshot();
  });

  it('should generate logs', () => {
    service.getStatus();
    expect(logger.setLoggedClass).toHaveBeenCalledWith(StatusService.name);
    expect(logger.setLoggedMethod).toHaveBeenCalledWith(
      StatusService.prototype.getStatus.name
    );
    expect(logger.debug).toHaveBeenCalledTimes(1);
  });
});
