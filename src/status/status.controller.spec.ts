import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { LoggerService } from '../logger/logger.service';
import { authConfig } from '../config';
// import { LoggerModule } from '../logger/logger.module';
import { StatusController } from './status.controller';
import { StatusService } from './status.service';
// import { JwtAuthGuard } from '../auth/guards';

describe('StatusController (authentication disabled)', () => {
  let controller: StatusController;
  let logger: LoggerService;
  const OLD_ENV = process.env;

  beforeEach(async () => {
    process.env = { ...OLD_ENV };

    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(authConfig)],
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
    logger = module.get<LoggerService>(LoggerService);
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get status', () => {
    expect(controller.getStatus()).toMatchSnapshot();
  });

  it('should generate logs', () => {
    controller.getStatus();
    expect(logger.setLoggedClass).toHaveBeenCalled();
    expect(logger.setLoggedMethod).toHaveBeenCalledWith(
      StatusController.prototype.getStatus.name
    );
    expect(logger.debug).toHaveBeenCalledTimes(1);
  });
});

// describe('StatusController (authentication enabled)', () => {
//   let controller: StatusController;
//   const OLD_ENV = process.env;

//   beforeEach(async () => {
//     process.env.BAS_AUTH_ENABLE = 'true';
//     process.env.BAS_AUTH_USERNAME = 'sample_test_user';
//     process.env.BAS_AUTH_JWT_SECRET = 'sample_jwt_secret';

//     const module: TestingModule = await Test.createTestingModule({
//       imports: [LoggerModule],
//       providers: [
//         {
//           provide: LoggerService,
//           useValue: {
//             debug: jest.fn(),
//             log: jest.fn(),
//             setLoggedClass: jest.fn(),
//             setLoggedMethod: jest.fn(),
//           },
//         },
//         {
//           provide: ConfigService,
//           useValue: {
//             get: jest.fn().mockImplementation((key: string) => {
//               if (key === 'BAS_AUTH_ENABLE') return 'true';
//               return null;
//             }),
//           },
//         },
//       ],
//       controllers: [StatusController],
//     }).compile();

//     controller = module.get<StatusController>(StatusController);
//   });

//   afterAll(() => {
//     process.env = OLD_ENV;
//   });

//   // it('should use JwtAuthGuard if authentication is set to true', () => {
//   //   const guards = Reflect.getMetadata('__guards__', module);
//   //   console.log(guards);
//   //   // prettier-ignore
//   //   const guard = new (guards[0]);

//   //   expect(guard).toBeInstanceOf(JwtAuthGuard);
//   // });
// });
