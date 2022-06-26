import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppModule } from './app.module';

describe('AppModule', () => {
  const { env } = process;
  process.env.BAS_BATTLENET_REGION = 'us';
  process.env.BAS_BATTLENET_CLIENT_ID = 'sample-client-id';
  process.env.BAS_BATTLENET_CLIENT_SECRET = 'sample-client-secret';

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...env };
  });

  it('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ validationSchema: null }), AppModule],
    }).compile();

    expect(module.get(AppController)).toBeInstanceOf(AppController);
  });

  afterEach(() => {
    process.env = env;
  });
});
