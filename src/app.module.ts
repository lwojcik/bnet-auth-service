import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { configValidationSchema, throttleConfig } from './config';
import { StatusModule } from './status/status.module';
import { AccessTokenModule } from './accesstoken/accesstoken.module';
import { LoggerModule } from './logger/logger.module';
import { MainModule } from './main/main.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard, PassthroughGuard } from './auth/guards';
import { CronModule } from './cron/cron.module';

const imports = [
  ConfigModule.forRoot({
    validationSchema: configValidationSchema,
    validationOptions: {
      abortEarly: true,
    },
  }),
  ThrottlerModule.forRootAsync({
    imports: [ConfigModule.forFeature(throttleConfig)],
    inject: [ConfigService],
    useFactory: (config: ConfigService) => ({
      ttl: config.get('throttle.ttlSecs'),
      limit: config.get('throttle.limit'),
    }),
  }),
  AuthModule,
  LoggerModule,
  MainModule,
  StatusModule,
  AccessTokenModule,
];

/* istanbul ignore next */
if (process.env.BAS_CRON_ENABLE === 'true') {
  imports.push(CronModule);
}

@Module({
  imports,
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_GUARD,
      useClass:
        // istanbul ignore next
        process.env.BAS_AUTH_ENABLE === 'true'
          ? JwtAuthGuard
          : PassthroughGuard,
    },
  ],
})
export class AppModule {}
