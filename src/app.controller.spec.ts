import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { endpointsConfig, redisConfig } from './config';
import { LoggerService } from './logger/logger.service';
import { MainService } from './main/main.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forFeature(endpointsConfig),
        ConfigModule.forFeature(redisConfig),
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

  describe('root', () => {
    it('should return name and list of routes', () => {
      expect(appController.getMain()).toMatchSnapshot();
    });
  });
});
