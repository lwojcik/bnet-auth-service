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

export const NODE_ENV = "NODE_ENV";
export const HOST = "BAS_HOST";
export const PORT = "BAS_PORT";

export const DEFAULTS = {
  host: "0.0.0.0",
  port: 3000,
  environment: Environment.development,
  logLevel: {
    production: LogLevel.error,
    development: LogLevel.debug,
  },
};
