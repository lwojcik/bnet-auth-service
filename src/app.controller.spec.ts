import { ConfigModule, registerAs } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { LoggerService } from './logger/logger.service';
import { MainService } from './main/main.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forFeature(
          registerAs('endpoints', () => ({
            testEndpoint1: {
              name: 'testEndpoint1',
              url: '/testEndpoint1',
              method: 'TEST_METHOD_1',
            },
            testEndpoint2: {
              name: 'testEndpoint2',
              url: '/testEndpoint2',
              method: 'TEST_METHOD_2',
            },
          }))
        ),
        ConfigModule.forFeature(
          registerAs('redis', () => ({
            enable: false,
          }))
        ),
      ],
      controllers: [AppController],
      providers: [
        MainService,
        {
          provide: LoggerService,
          useValue: {
            debug: jest.fn(),
            log: jest.fn(),
            setLoggedClass: jest.fn(),
            setLoggedMethod: jest.fn(),
          },
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  it('should implement getMain method', () => {
    expect(() => {
      appController.getMain();
    }).not.toThrow();
  });
});
