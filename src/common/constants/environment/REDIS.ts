import { APP_INFO } from '../APP_INFO';
import { getEnvVar } from '../../../utils';
import { FeaturePrefix } from '../../types';

const { appPrefix } = APP_INFO;
const featurePrefix = FeaturePrefix.redis;

const prop = (property: string) =>
  getEnvVar({ appPrefix, featurePrefix, property });

export const REDIS = {
  enable: prop('ENABLE'),
  host: prop('HOST'),
  port: prop('PORT'),
  password: prop('PASSWORD'),
  ttlSecs: prop('TTL_SECS'),
  db: prop('DB'),
  keyPrefix: prop('KEY_PREFIX'),
  keyName: prop('KEY_NAME'),
};
