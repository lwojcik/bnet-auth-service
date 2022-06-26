import { ConfigModule, registerAs } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { LoggerService } from '../logger/logger.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let serviceWithAuthEnabled: AuthService;
  let serviceWithAuthDisabled: AuthService;

  beforeEach(async () => {
    const module = ({ enableAuth }) =>
      Test.createTestingModule({
        imports: [
          ConfigModule.forFeature(
            registerAs('auth', () => ({
              enable: enableAuth,
              username: 'test_user',
              jwtSecret: 'test_jwt_secret',
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
          AuthService,
        ],
      }).compile();

    serviceWithAuthEnabled = (
      await module({
        enableAuth: true,
      })
    ).get<AuthService>(AuthService);

    serviceWithAuthDisabled = (
      await module({
        enableAuth: false,
      })
    ).get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(serviceWithAuthEnabled).toBeDefined();
  });

  describe('authorization enabled', () => {
    it('should validate matching username positively', () => {
      const user = 'test_user';
      expect(serviceWithAuthEnabled.validate(user)).toEqual(user);
    });

    it('should validate non-matching username negatively', () => {
      expect(serviceWithAuthEnabled.validate('non_existent_user')).toBeNull();
    });
  });

  describe('authorization disabled', () => {
    it('should validate any username positively', () => {
      const user = 'completely_irrelevant_username';
      expect(serviceWithAuthDisabled.validate(user)).toEqual(user);
    });
  });
});
