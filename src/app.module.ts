import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CONFIG_VALIDATION_SCHEMA } from './common/constants';
import {
  appConfig,
  endpointsConfig,
  redisConfig,
  battleNetConfig,
} from './config';
import { StatusModule } from './status/status.module';
import { AccessTokenModule } from './accesstoken/accesstoken.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      load: [appConfig, endpointsConfig, redisConfig, battleNetConfig],
      validationSchema: CONFIG_VALIDATION_SCHEMA,
      validationOptions: {
        abortEarly: true,
      },
    }),
    LoggerModule,
    StatusModule,
    AccessTokenModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
