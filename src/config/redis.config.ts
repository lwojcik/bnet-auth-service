import { registerAs } from '@nestjs/config';
import { trueStringToBoolean } from '../utils/trueStringToBoolean';
import { REDIS, DEFAULTS } from '../common/constants';

const { env } = process;
const defaultValue = DEFAULTS.redis;

export const redisConfig = registerAs('redis', () => ({
  enable: trueStringToBoolean({ value: env[REDIS.enable] }),
  host: env[REDIS.host] || defaultValue.host,
  port: parseInt(env[REDIS.port], 10) || defaultValue.port,
  password: env[REDIS.password] || defaultValue.password,
  ttlSecs: parseInt(env[REDIS.ttlSecs], 10) || defaultValue.ttlSecs,
  db: parseInt(env[REDIS.db], 10) || defaultValue.db,
  keyName: env[REDIS.keyName] || defaultValue.keyName,
  keyPrefix: env[REDIS.keyPrefix] || defaultValue.keyPrefix,
}));
