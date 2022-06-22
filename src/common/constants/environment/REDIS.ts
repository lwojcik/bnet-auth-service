import { ENV_VAR_PREFIX } from './ENV_VAR_PREFIX';

export const REDIS = {
  enable: `${ENV_VAR_PREFIX}_REDIS_ENABLE`,
  host: `${ENV_VAR_PREFIX}_REDIS_HOST`,
  port: `${ENV_VAR_PREFIX}_REDIS_PORT`,
  password: `${ENV_VAR_PREFIX}_REDIS_PASSWORD`,
  ttlSecs: `${ENV_VAR_PREFIX}_REDIS_TTL_SECS`,
  db: `${ENV_VAR_PREFIX}_REDIS_DB`,
  keyPrefix: `${ENV_VAR_PREFIX}_REDIS_KEY_PREFIX`,
  keyName: `${ENV_VAR_PREFIX}_REDIS_KEY_NAME`,
};
