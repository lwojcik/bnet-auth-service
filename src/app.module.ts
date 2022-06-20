import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { v4 } from 'uuid';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  Environment,
  DEFAULTS,
  APP,
  configValidationSchema,
} from './common/common.constants';
import {
  appConfig,
  endpointsConfig,
  redisConfig,
  battleNetConfig,
} from './config';
import { StatusModule } from './status/status.module';
import { AccessTokenModule } from './accesstoken/accesstoken.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      load: [appConfig, endpointsConfig, redisConfig, battleNetConfig],
      validationSchema: configValidationSchema,
      validationOptions: {
        abortEarly: true,
      },
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        genReqId: () => v4().toString(),
        level:
          process.env[APP.env] !== Environment.production
            ? DEFAULTS.logLevel.development
            : DEFAULTS.logLevel.production,
        transport:
          process.env[APP.env] !== Environment.production
            ? {
                target: 'pino-pretty',
                options: {
                  colorize: true,
                  translateTime: 'SYS:dd/mm/yyyy, HH:MM:ss',
                  ignore: 'req,res,pid,context,responseTime',
                  singleLine: true,
                },
              }
            : undefined,
      },
    }),
    StatusModule,
    AccessTokenModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
