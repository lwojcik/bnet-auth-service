import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { CONFIG_VALIDATION_SCHEMA } from './common/constants';
import { StatusModule } from './status/status.module';
import { AccessTokenModule } from './accesstoken/accesstoken.module';
import { LoggerModule } from './logger/logger.module';
import { MainModule } from './main/main.module';
import { endpointsConfig, redisConfig } from './config';

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
    LoggerModule,
    MainModule,
    StatusModule,
    AccessTokenModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
