import { registerAs } from '@nestjs/config';

export const appConfig = registerAs('app', () => ({
  name: 'bnet-auth-service',
  environment: process.env.NODE_ENV,
  host: process.env.BAS_APP_HOST,
  port: parseInt(process.env.BAS_APP_PORT, 10),
  enableCors: process.env.BAS_APP_CORS_ENABLE === 'true',
  corsOrigin: process.env.BAS_APP_CORS_ORIGIN,
}));
