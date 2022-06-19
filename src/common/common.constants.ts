import * as Joi from "joi";
import { BlizzAPI } from "blizzapi";

export enum Environment {
  production = "production",
  development = "development",
}

export enum LogLevel {
  trace = "trace",
  debug = "debug",
  info = "info",
  warn = "warn",
  error = "error",
  fatal = "fatal",
  silent = "silent",
}

export enum LogLevelValue {
  trace = 10,
  debug = 20,
  info = 30,
  warn = 40,
  error = 50,
  fatal = 60,
  silent = "Infinity",
}

export const APP = {
  env: "NODE_ENV",
  host: "BAS_APP_HOST",
  port: "BAS_APP_PORT",
};

export const REDIS = {
  enable: "BAS_REDIS_ENABLE",
  host: "BAS_REDIS_HOST",
  port: "BAS_REDIS_PORT",
  password: "BAS_REDIS_PASSWORD",
  ttlSecs: "BAS_REDIS_TTLE_SECS",
  db: "BAS_REDIS_DB",
  cacheSegment: "BAS_REDIS_CACHE_SEGMENT",
};

export const BATTLENET = {
  region: "BAS_BATTLENET_REGION",
  key: "BAS_BATTLENET_KEY",
  secret: "BAS_BATTLENET_SECRET",
};

export const DEFAULTS = {
  env: "production",
  host: "0.0.0.0",
  port: 3000,
  environment: Environment.development,
  logLevel: {
    production: LogLevel.error,
    development: LogLevel.debug,
  },
  redis: {
    enable: true,
    host: "127.0.0.1",
    port: 6379,
    password: "",
    ttlSecs: 2000,
    db: 0,
    cacheSegment: "bas",
  },
};

export const configValidationSchema = Joi.object({
  [APP.env]: Joi.string().default(DEFAULTS.env),
  [APP.host]: Joi.string().default(DEFAULTS.host),
  [APP.port]: Joi.string().default(DEFAULTS.port),
  [REDIS.enable]: Joi.string().default("true"),
  [REDIS.host]: Joi.any().when(`${REDIS.enable}`, {
    is: "true",
    then: Joi.string().default(DEFAULTS.redis.host),
    otherwise: Joi.optional(),
  }),
  [REDIS.host]: Joi.any().when(REDIS.enable, {
    is: "true",
    then: Joi.string().default(DEFAULTS.redis.host),
    otherwise: Joi.optional(),
  }),
  [REDIS.port]: Joi.any().when(REDIS.enable, {
    is: "true",
    then: Joi.string().default(DEFAULTS.redis.port),
    otherwise: Joi.optional(),
  }),
  [REDIS.password]: Joi.optional(),
  [REDIS.ttlSecs]: Joi.any().when(REDIS.enable, {
    is: "true",
    then: Joi.string().default(DEFAULTS.redis.ttlSecs),
    otherwise: Joi.optional(),
  }),
  [REDIS.db]: Joi.any().when(REDIS.enable, {
    is: "true",
    then: Joi.string().default(DEFAULTS.redis.db),
    otherwise: Joi.optional(),
  }),
  [REDIS.cacheSegment]: Joi.any().when(REDIS.enable, {
    is: "true",
    then: Joi.string().default(DEFAULTS.redis.cacheSegment),
    otherwise: Joi.optional(),
  }),
  [BATTLENET.region]: Joi.string()
    .required()
    .custom((value) => {
      const allowedRegionNames = BlizzAPI.getAllRegionNames().join(", ");
      const validRegionName = BlizzAPI.validateRegionName(value);
      if (!validRegionName) {
        throw new RangeError(
          `'${value}' is not a valid Battle.net region. Available regions: ${allowedRegionNames}`
        );
      }
      return validRegionName;
    }),
  [BATTLENET.key]: Joi.string().required(),
  [BATTLENET.secret]: Joi.string().required(),
});
