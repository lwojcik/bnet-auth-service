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
  host: "BAS_HOST",
  port: "BAS_PORT",
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
