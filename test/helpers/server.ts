import fs from 'fs';
import { ConfigModule, registerAs } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Test, TestingModule } from '@nestjs/testing';
import { LoggerModule } from 'nestjs-pino';
import { Provider } from '@nestjs/common';
import { AppController } from '../../src/app.controller';
import { AuthModule } from '../../src/auth/auth.module';
import { JwtAuthGuard, PassthroughGuard } from '../../src/auth/guards';
import { MainModule } from '../../src/main/main.module';
import { StatusModule } from '../../src/status/status.module';
import { AccessTokenModule } from '../../src/accesstoken/accesstoken.module';
import { LoggerService } from '../../src/logger/logger.service';
import { JwtStrategy } from '../../src/auth/strategies/jwt.strategy';

interface TestServerParams {
  auth?: {
    enable?: boolean;
    username?: string;
    jwtSecret?: string;
  };
  battlenet?: {
    region?: string;
    clientId?: string;
    clientSecret?: string;
  };
  cors?: {
    enable?: boolean;
    origin?: string;
  };
  https?: {
    enable?: boolean;
    key?: string;
    cert?: string;
  };
  redis?: {
    enable?: boolean;
    host?: string;
    port?: string;
    ttlSecs?: string;
    db?: 0;
    keyPrefix?: string;
    keyName?: string;
  };
}

type TestingModuleFactory = (
  params: TestServerParams
) => Promise<TestingModule>;

const createTestingModule: TestingModuleFactory = (
  params?: TestServerParams
) => {
  const providers: Provider[] = [
    LoggerService,
    {
      provide: APP_GUARD,
      useClass: params?.auth?.enable ? JwtAuthGuard : PassthroughGuard,
    },
  ];

  if (params?.auth?.enable) {
    providers.push(JwtStrategy);
  }

  return Test.createTestingModule({
    imports: [
      ConfigModule.forRoot({
        load: [
          registerAs('auth', () => ({
            enable: params?.auth?.enable,
            username: params?.auth?.username,
            jwtSecret: params?.auth?.jwtSecret,
          })),
          registerAs('battlenet', () => ({
            region: params?.battlenet?.region,
            clientId: params?.battlenet?.clientId,
            clientSecret: params?.battlenet?.clientSecret,
          })),
        ],
      }),
      LoggerModule,
      AuthModule,
      MainModule,
      StatusModule,
      AccessTokenModule,
    ],
    controllers: [AppController],
    providers,
  }).compile();
};

export const createTestServer = async (params?: TestServerParams) => {
  const moduleFixture = await createTestingModule(params);

  const adapterConfig = params?.https?.enable
    ? {
        https: {
          key: fs.readFileSync(params.https.key),
          cert: fs.readFileSync(params.https.cert),
        },
      }
    : undefined;

  const app = moduleFixture.createNestApplication<NestFastifyApplication>(
    new FastifyAdapter(adapterConfig)
  );

  if (params?.cors?.enable) {
    app.enableCors({
      origin: params.cors.origin,
    });
  }

  return app;
};

export const startTestServer = async (app: NestFastifyApplication) => {
  if (app) {
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  }
};

export const stopTestServer = async (app: NestFastifyApplication) => {
  if (app) await app.close();
};
