/* istanbul ignore file */
import { Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Injectable()
export class LoggerService {
  constructor(@InjectPinoLogger() private readonly pinoLogger: PinoLogger) {}

  public error(obj: unknown) {
    return this.pinoLogger.error(obj);
  }

  public debug(msg: string) {
    this.pinoLogger.debug(msg);
  }

  public warn(msg: unknown) {
    return this.pinoLogger.warn(msg);
  }

  public info(msg: string) {
    return this.pinoLogger.info(msg);
  }
}
