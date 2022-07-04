import { ConfigModule, registerAs } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppModule } from './app.module';
import { CONFIG_VALIDATION_SCHEMA } from './common/constants';
import { endpointsConfig, redisConfig } from './config';

describe('AppModule', () => {
  let OLD_ENV: NodeJS.ProcessEnv;

  beforeAll(() => {
    OLD_ENV = process.env;
  });

  afterAll(async () => {
    process.env = { ...OLD_ENV };
  });

  it('should compile the module', async () => {
    process.env.BAS_BATTLENET_REGION = 'us';
    process.env.BAS_CLIENT_ID = 'test-client-id';
    process.env.BAS_CLIENT_SECRET = 'test-client-secret';

    const module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [
            endpointsConfig,
            redisConfig,
            registerAs('battlenet', () => ({
              region: 'us',
              clientId: 'test-client-id',
              clientSecret: 'test-client-secret',
            })),
          ],
          cache: true,
          validationSchema: CONFIG_VALIDATION_SCHEMA,
          validationOptions: {
            abortEarly: true,
          },
        }),
        AppModule,
      ],
    }).compile();

    expect(module.get(AppController)).toBeInstanceOf(AppController);
  });
});
