import { Test, TestingModule } from '@nestjs/testing';
import { PinoLogger, LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { LoggerService } from './logger.service';

describe('LoggerService', () => {
  let service: LoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PinoLoggerModule.forRoot()],
      providers: [
        {
          provide: PinoLogger,
          useValue: jest.fn(),
        },
        LoggerService,
      ],
    }).compile();

    service = await module.resolve<LoggerService>(LoggerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
