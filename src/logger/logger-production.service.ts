import { Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Injectable()
export class LoggerProductionService {
  constructor(@InjectPinoLogger() private readonly pinoLogger: PinoLogger) {}

  public setLoggedClass() {
    return false;
  }

  public setLoggedMethod() {
    return false;
  }

  public debug() {
    return false;
  }

  public error(obj: unknown, msg?: string, ...args) {
    return this.pinoLogger.error(obj, msg, args);
  }
}
