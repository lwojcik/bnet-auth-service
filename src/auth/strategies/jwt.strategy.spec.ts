import { ConfigModule, registerAs } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtStrategy } from './jwt.strategy';

describe('AppController', () => {
  let jwtStrategyWithAuthEnabled: JwtStrategy;
  let jwtStrategyWithAuthDisabled: JwtStrategy;

  beforeEach(async () => {
    const moduleFactory: (enableAuth?: boolean) => Promise<TestingModule> = (
      enableAuth
    ) =>
      Test.createTestingModule({
        imports: [
          ConfigModule.forFeature(
            registerAs('auth', () => ({
              enable: enableAuth,
              username: 'test-user',
              jwtSecret: 'test-jwt-secret',
            }))
          ),
        ],
        providers: [JwtStrategy],
      }).compile();

    jwtStrategyWithAuthEnabled = (await moduleFactory(true)).get<JwtStrategy>(
      JwtStrategy
    );
    jwtStrategyWithAuthDisabled = (await moduleFactory(false)).get<JwtStrategy>(
      JwtStrategy
    );
  });

  it('should be defined', () => {
    expect(jwtStrategyWithAuthEnabled).toBeDefined();
  });

  it('should validate correct username positively', () => {
    const payload = {
      username: 'test-user',
    };

    expect(jwtStrategyWithAuthEnabled.validate(payload)).toEqual(payload);
  });

  it('should reject invalid username', () => {
    const payload = {
      username: 'nonexistent-test-user',
    };

    expect(jwtStrategyWithAuthEnabled.validate(payload)).toBeNull();
  });

  it('should skip validation if authorization is disabled', () => {
    const payload = {
      username: 'irrelevant-test-user',
    };

    expect(jwtStrategyWithAuthDisabled.validate(payload)).toBe('authorized');
  });
});
