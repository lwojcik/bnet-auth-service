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

  it('should implement setLoggedClass', () => {
    expect(() => {
      service.setLoggedClass('testClass');
    }).not.toThrow();
  });

  it('should implement setLoggedMethod', () => {
    expect(() => {
      service.setLoggedMethod('testMethod');
      service.setLoggedMethod('testMethodWithArgs', 'testArg');
      service.setLoggedMethod('testMethodWithEmptyArg', '');
      service.setLoggedMethod('testMethodWithObjectArg', {
        testKey: 'testValue',
      });
    }).not.toThrow();
  });

  it('should work with no logged class set', () => {
    expect(() => {
      service.setLoggedMethod('testMethod');
      service.debug('test');
    }).not.toThrow();
  });

  it('should work with no logged method set', () => {
    expect(() => {
      service.setLoggedClass('testClass');
      service.debug('test');
    }).not.toThrow();
  });

  it('should implement debug method', () => {
    expect(() => {
      service.setLoggedClass('testClass');
      service.setLoggedMethod('testMethod');
      service.debug('testMethod');
      service.debug();
    }).not.toThrow();
  });

  it('should implement error method', () => {
    expect(() => {
      service.setLoggedClass('testClass');
      service.setLoggedMethod('testMethod');
      service.error({ some: 'error' });
    }).not.toThrow();
  });

  it('should implement warn method', () => {
    expect(() => {
      service.setLoggedClass('testClass');
      service.setLoggedMethod('testMethod');
      service.warn('Some warning');
    }).not.toThrow();
  });

  it('should implement info method', () => {
    expect(() => {
      service.setLoggedClass('testClass');
      service.setLoggedMethod('testMethod');
      service.info('Some info');
    }).not.toThrow();
  });
});
