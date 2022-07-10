import { Module } from '@nestjs/common';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { v4 } from 'uuid';
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
          process.env.NODE_ENV === 'production'
            ? // istanbul ignore next
              'error'
            : process.env.NODE_ENV === 'development'
            ? // istanbul ignore next
              'debug'
            : 'silent',
        transport:
          process.env.NODE_ENV !== 'production'
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
