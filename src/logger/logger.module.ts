import { Module } from '@nestjs/common';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { v4 } from 'uuid';
import { APP, DEFAULTS } from '../common/constants';
import { Environment } from '../common/types';
import { LoggerService } from './logger.service';

@Module({
  imports: [
    PinoLoggerModule.forRoot({
      pinoHttp: {
        // prettier-ignore
        genReqId: // istanbul ignore next
          () => v4().toString(),
        level:
          // eslint-disable-next-line no-nested-ternary
          process.env[APP.environment] === Environment.production
            ? DEFAULTS.logLevel.production
            : process.env[APP.environment] === Environment.development
            ? DEFAULTS.logLevel.development
            : DEFAULTS.logLevel.test,
        transport:
          process.env[APP.environment] !== Environment.production
            ? {
                target: 'pino-pretty',
                options: {
                  messageFormat: '[{req.url}] {res.status} {msg}',
                  colorize: true,
                  translateTime: 'SYS:dd/mm/yyyy, HH:MM:ss',
                  ignore: 'req,res,pid,context,responseTime',
                  singleLine: true,
                },
              }
            : // istanbul ignore next
              undefined,
      },
    }),
  ],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
