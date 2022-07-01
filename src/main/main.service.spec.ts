import { ConfigModule, registerAs } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { LoggerService } from '../logger/logger.service';
import { MainService } from './main.service';

describe('MainService', () => {
  let service: MainService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get status', () => {
    expect(service.getMain()).toMatchSnapshot();
  });
});
