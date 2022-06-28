import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AUTH, CONFIG_VALIDATION_SCHEMA, THROTTLE } from './common/constants';
import { StatusModule } from './status/status.module';
import { AccessTokenModule } from './accesstoken/accesstoken.module';
import { LoggerModule } from './logger/logger.module';
import { MainModule } from './main/main.module';
import { endpointsConfig, redisConfig } from './config';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard, PassthroughGuard } from './auth/guards';
import { trueStringToBoolean } from './utils/trueStringToBoolean';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [endpointsConfig, redisConfig],
      cache: true,
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
  ],
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
