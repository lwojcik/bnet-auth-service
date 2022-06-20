import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { v4 } from 'uuid';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import appConfig from './config/app.config';
import {
  Environment,
  DEFAULTS,
  APP,
  configValidationSchema,
} from './common/common.constants';
import { StatusModule } from './status/status.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      validationSchema: configValidationSchema,
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
