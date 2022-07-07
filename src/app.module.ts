import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import {
  AUTH,
  CONFIG_VALIDATION_SCHEMA,
  CRON,
  THROTTLE,
} from './common/constants';
import { StatusModule } from './status/status.module';
import { AccessTokenModule } from './accesstoken/accesstoken.module';
import { LoggerModule } from './logger/logger.module';
import { MainModule } from './main/main.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard, PassthroughGuard } from './auth/guards';
import { trueStringToBoolean } from './utils/trueStringToBoolean';
import { CronModule } from './cron/cron.module';

const imports = [
  ConfigModule.forRoot({
    validationSchema: CONFIG_VALIDATION_SCHEMA,
    validationOptions: {
      abortEarly: true,
    },
  }),
  ThrottlerModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (config: ConfigService) => ({
      ttl: config.get(THROTTLE.ttlSecs),
      limit: config.get(THROTTLE.limit),
    }),
  }),
  AuthModule,
  LoggerModule,
  MainModule,
  StatusModule,
  AccessTokenModule,
];

/* istanbul ignore next */
if (trueStringToBoolean({ value: process.env[CRON.enable] })) {
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
        trueStringToBoolean({ value: process.env[AUTH.enable] })
          ? JwtAuthGuard
          : PassthroughGuard,
    },
  ],
})
export class AppModule {}
