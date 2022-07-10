import { registerAs } from '@nestjs/config';

export const redisConfig = registerAs('redis', () => ({
  enable: process.env.BAS_REDIS_ENABLE === 'true',
  host: process.env.BAS_REDIS_HOST,
  port: parseInt(process.env.BAS_REDIS_PORT, 10),
  password: process.env.BAS_REDIS_PASSWORD,
  ttlSecs: parseInt(process.env.BAS_REDIS_TTL_SECS, 10),
  db: parseInt(process.env.BAS_REDIS_DB, 10),
  keyPrefix: 'bas',
  keyName: 'accesstoken',
}));
