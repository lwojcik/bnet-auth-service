import { registerAs } from '@nestjs/config';
import { REDIS, DEFAULTS } from '../common/constants';

const { env } = process;
const defaultValue = DEFAULTS.redis;

export const redisConfig = registerAs('redis', () => ({
  enable: env[REDIS.enable] || defaultValue.enable,
  host: env[REDIS.host] || defaultValue.host,
  port: env[REDIS.port] || defaultValue.port,
  password: env[REDIS.password] || defaultValue.password,
  ttlSecs: env[REDIS.ttlSecs] || defaultValue.ttlSecs,
  db: env[REDIS.db] || defaultValue.db,
  keyName: env[REDIS.keyName] || defaultValue.keyName,
  keyPrefix: env[REDIS.keyPrefix] || defaultValue.keyPrefix,
}));
