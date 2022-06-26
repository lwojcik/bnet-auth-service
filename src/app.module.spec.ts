import { Test } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppModule } from './app.module';

describe('AppModule', () => {
  const { env } = process;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...env };
  });

  it('should compile the module', async () => {
    process.env.BAS_BATTLENET_REGION = 'us';
    process.env.BAS_BATTLENET_CLIENT_ID = 'sample-client-id';
    process.env.BAS_BATTLENET_CLIENT_SECRET = 'sample-client-secret';

    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    expect(module.get(AppController)).toBeInstanceOf(AppController);
  });

  afterEach(() => {
    process.env = env;
  });
});
