import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, registerAs } from '@nestjs/config';
import { BlizzAPI } from 'blizzapi';
import { LoggerService } from '../logger/logger.service';
import { BattleNetService } from './battlenet.service';

jest.mock('blizzapi');

describe('BattleNetService', () => {
  let service: BattleNetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forFeature(
          registerAs('battlenet', () => ({
            region: 'sample-battlenet-region',
            clientId: 'sample-client-id',
            clientSecret: 'sample-client-secret',
          }))
        ),
      ],
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
        BattleNetService,
      ],
    }).compile();

    service = module.get<BattleNetService>(BattleNetService);
  });

  afterAll(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (BlizzAPI as any).mockClear();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get access token', async () => {
    BlizzAPI.prototype.getAccessToken = () =>
      Promise.resolve('sample_access_token_from_blizzapi_mock');

    expect.assertions(1);
    const accessToken = await service.getAccessToken();
    expect(accessToken).toMatchSnapshot();
  });

  it('should return error object in case of Battle.net API error', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (BlizzAPI as any).prototype.getAccessToken = () =>
      // eslint-disable-next-line prefer-promise-reject-errors
      Promise.reject({
        message: 'Sample error message from BlizzAPI mock',
        response: {
          status: 'Sample error status from BlizzAPI mock',
        },
      });

    expect.assertions(1);
    const accessToken = await service.getAccessToken();
    expect(accessToken).toMatchSnapshot();
  });
});
