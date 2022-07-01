import { registerAs } from '@nestjs/config';
import { trueStringToBoolean } from '../utils/trueStringToBoolean';
import { APP, APP_INFO, DEFAULTS } from '../common/constants';

const { env } = process;
const defaultValue = DEFAULTS.app;

export const appConfig = registerAs('app', () => ({
  name: APP_INFO.name,
  environment: env[APP.environment],
  host: env[APP.host] || defaultValue.host,
  port: parseInt(env[APP.port], 10) || defaultValue.port,
  enableCors:
    trueStringToBoolean({ value: env[APP.enableCors] }) ||
    defaultValue.enableCors,
  corsOrigin: env[APP.corsOrigin] || defaultValue.corsOrigin,
}));
