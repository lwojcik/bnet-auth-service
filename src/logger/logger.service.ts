/* istanbul ignore file */
import { Injectable, Scope } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { APP } from '../common/constants';
import { Environment } from '../common/types';

@Injectable({
  scope:
    // eslint-disable-next-line no-nested-ternary
    process.env[APP.environment] !== Environment.production
      ? process.env[APP.environment] === Environment.test
        ? Scope.DEFAULT
        : Scope.TRANSIENT
      : Scope.DEFAULT,
})
export class LoggerService {
  private loggedClass: string;

  private loggedMethod: string;

  constructor(@InjectPinoLogger() private readonly pinoLogger: PinoLogger) {}

  private getPrefix() {
    return `${this.loggedClass}${
      this.loggedMethod ? `.${this.loggedMethod}` : ''
    }`;
  }

  private isPrefixSet() {
    return this.loggedClass || this.loggedMethod;
  }

  private formatArgs(args: unknown) {
    if (typeof args === 'string' && args.length > 0) {
      return `'${args}`;
    }
    if (typeof args === 'string' && args.length === 0) {
      return '';
    }
    if (typeof args === 'object' && Object.values(args as object).length > 0) {
      return JSON.stringify(args);
    }
    return '';
  }

  public setLoggedClass(className: string) {
    this.loggedClass = className;
  }

  public setLoggedMethod(methodName: string, args?: unknown) {
    this.loggedMethod = `${methodName}(${this.formatArgs(args)})`;
  }

  public error(obj: unknown) {
    return this.pinoLogger.error(obj);
  }

  public debug(msg?: unknown, ...args: unknown[]) {
    if (this.isPrefixSet()) {
      this.pinoLogger.debug(
        `${this.getPrefix()}${msg ? `: ${msg}` : ''}`,
        args
      );
    }
  }

  public warn(msg: unknown) {
    return this.pinoLogger.warn(msg);
  }

  public info(msg: string) {
    return this.pinoLogger.info(msg);
  }
}
