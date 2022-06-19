import { APP, BATTLENET, DEFAULTS, REDIS } from "../common/common.constants";

const { env } = process;

export default () => ({
  app: {
    environment: env[APP.env] || DEFAULTS.environment,
    host: env[APP.host] || DEFAULTS.host,
    port: parseInt(env[APP.port], 10) || DEFAULTS.port,
  },
  redis: {
    enable: env[REDIS.enable] || DEFAULTS.redis.enable,
    host: env[REDIS.host] || DEFAULTS.redis.host,
    port: env[REDIS.port] || DEFAULTS.redis.port,
    password: env[REDIS.password] || DEFAULTS.redis.password,
    ttlSecs: env[REDIS.ttlSecs] || DEFAULTS.redis.ttlSecs,
    db: env[REDIS.db] || DEFAULTS.redis.db,
    cacheSegment: env[REDIS.cacheSegment] || DEFAULTS.redis.cacheSegment,
  },
  battlenet: {
    region: env[BATTLENET.region],
    key: env[BATTLENET.key],
    secret: env[BATTLENET.secret],
  },
});
