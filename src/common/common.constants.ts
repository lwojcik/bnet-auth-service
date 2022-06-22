import * as Joi from 'joi';
import { BlizzAPI } from 'blizzapi';

export enum Environment {
  production = 'production',
  development = 'development',
}

export enum LogLevel {
  trace = 'trace',
  debug = 'debug',
  info = 'info',
  warn = 'warn',
  error = 'error',
  fatal = 'fatal',
  silent = 'silent',
}

export enum LogLevelValue {
  trace = 10,
  debug = 20,
  info = 30,
  warn = 40,
  error = 50,
  fatal = 60,
  silent = 'Infinity',
}

export const APP = {
  env: 'NODE_ENV',
  host: 'BAS_APP_HOST',
  port: 'BAS_APP_PORT',
};

export const REDIS = {
  enable: 'BAS_REDIS_ENABLE',
  host: 'BAS_REDIS_HOST',
  port: 'BAS_REDIS_PORT',
  password: 'BAS_REDIS_PASSWORD',
  ttlSecs: 'BAS_REDIS_TTL_SECS',
  db: 'BAS_REDIS_DB',
  keyPrefix: 'BAS_REDIS_KEY_PREFIX',
  keyName: 'BAS_REDIS_KEY_NAME',
};

export const BATTLENET = {
  region: 'BAS_BATTLENET_REGION',
  clientId: 'BAS_BATTLENET_CLIENT_ID',
  clientSecret: 'BAS_BATTLENET_CLIENT_SECRET',
};

export const DEFAULTS = {
  app: {
    host: '0.0.0.0',
    port: 3000,
    environment: Environment.development,
  },
  logLevel: {
    production: LogLevel.error,
    development: LogLevel.debug,
  },
  redis: {
    enable: true,
    host: '127.0.0.1',
    port: 6379,
    password: '',
    ttlSecs: 2000,
    db: 0,
    keyPrefix: 'bas',
    keyName: 'accesstoken',
  },
};

export const configValidationSchema = Joi.object({
  [APP.env]: Joi.string().default(DEFAULTS.app.environment),
  [APP.host]: Joi.string().default(DEFAULTS.app.host),
  [APP.port]: Joi.string().default(DEFAULTS.app.port),
  [REDIS.enable]: Joi.string().default('true'),
  [REDIS.host]: Joi.any().when(`${REDIS.enable}`, {
    is: 'true',
    then: Joi.string().default(DEFAULTS.redis.host),
    otherwise: Joi.optional(),
  }),
  [REDIS.host]: Joi.any().when(REDIS.enable, {
    is: 'true',
    then: Joi.string().default(DEFAULTS.redis.host),
    otherwise: Joi.optional(),
  }),
  [REDIS.port]: Joi.any().when(REDIS.enable, {
    is: 'true',
    then: Joi.string().default(DEFAULTS.redis.port),
    otherwise: Joi.optional(),
  }),
  [REDIS.password]: Joi.optional(),
  [REDIS.ttlSecs]: Joi.any().when(REDIS.enable, {
    is: 'true',
    then: Joi.string().default(DEFAULTS.redis.ttlSecs),
    otherwise: Joi.optional(),
  }),
  [REDIS.db]: Joi.any().when(REDIS.enable, {
    is: 'true',
    then: Joi.string().default(DEFAULTS.redis.db),
    otherwise: Joi.optional(),
  }),
  [REDIS.keyPrefix]: Joi.any().when(REDIS.enable, {
    is: 'true',
    then: Joi.string().default(DEFAULTS.redis.keyPrefix),
    otherwise: Joi.optional(),
  }),
  [REDIS.keyName]: Joi.any().when(REDIS.enable, {
    is: 'true',
    then: Joi.string().default(DEFAULTS.redis.keyName),
    otherwise: Joi.optional(),
  }),
  [BATTLENET.region]: Joi.string()
    .required()
    .custom((value) => {
      const allowedRegionNames = BlizzAPI.getAllRegionNames()
        .filter((region) => region !== 'tw')
        .join(', ');

      const validRegionName = BlizzAPI.validateRegionName(value);

      if (!validRegionName) {
        throw new RangeError(
          `'${value}' is not a valid Battle.net region. Available regions: ${allowedRegionNames}`
        );
      }
      return validRegionName;
    }),
  [BATTLENET.clientId]: Joi.string().required(),
  [BATTLENET.clientSecret]: Joi.string().required(),
});
