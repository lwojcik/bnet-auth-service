import { Module } from '@nestjs/common';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { v4 } from 'uuid';
import { APP, DEFAULTS } from '../common/constants';
import { Environment } from '../common/types/Environment';
import { LoggerService } from './logger.service';

@Module({
  imports: [
    PinoLoggerModule.forRoot({
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
  ],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
