import { APP_INFO } from '../APP_INFO';
import { getEnvVar } from '../../../utils';
import { FeaturePrefix, RedisEnvVariable } from '../../types';

const { appPrefix } = APP_INFO;
const featurePrefix = FeaturePrefix.redis;

const prop = (name: string) =>
  getEnvVar({ appPrefix, featurePrefix, property: name });

export const REDIS = {
  enable: prop(RedisEnvVariable.enable),
  host: prop(RedisEnvVariable.host),
  port: prop(RedisEnvVariable.port),
  password: prop(RedisEnvVariable.password),
  ttlSecs: prop(RedisEnvVariable.ttlSecs),
  db: prop(RedisEnvVariable.db),
  keyPrefix: prop(RedisEnvVariable.keyPrefix),
  keyName: prop(RedisEnvVariable.keyName),
};
