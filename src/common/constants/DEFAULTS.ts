import { Environment } from '../types/Environment';
import { LogLevel } from '../types/LogLevel';

export const DEFAULTS = {
  app: {
    host: '0.0.0.0',
    port: 3000,
    environment: Environment.development,
    enableCors: false,
    corsOrigin: '',
  },
  logLevel: {
    production: LogLevel.error,
    development: LogLevel.debug,
  },
  redis: {
    enable: true,
    host: 'redis',
    port: 6379,
    password: '',
    ttlSecs: 2000,
    db: 0,
    keyPrefix: 'bas',
    keyName: 'accesstoken',
  },
};
