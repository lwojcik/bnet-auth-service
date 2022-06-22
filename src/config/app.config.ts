import { registerAs } from '@nestjs/config';
import { APP, APP_NAME, DEFAULTS } from '../common/constants';

const { env } = process;
const defaultValue = DEFAULTS.app;

export const appConfig = registerAs('app', () => ({
  name: APP_NAME,
  environment: env[APP.env] || defaultValue.environment,
  host: env[APP.host] || defaultValue.host,
  port: parseInt(env[APP.port], 10) || defaultValue.port,
  enableSwagger: env[APP.enableSwagger] || defaultValue.enableSwagger,
}));
