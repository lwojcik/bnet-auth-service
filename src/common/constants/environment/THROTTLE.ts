import { APP_INFO } from '../APP_INFO';
import { getEnvVar } from '../../../utils';
import { FeaturePrefix, ThrottleEnvVariable } from '../../types';

const { appPrefix } = APP_INFO;
const featurePrefix = FeaturePrefix.throttle;

const prop = (name: string) =>
  getEnvVar({ appPrefix, featurePrefix, property: name });

export const THROTTLE = {
  enable: prop(ThrottleEnvVariable.enable),
  ttlSecs: prop(ThrottleEnvVariable.ttlSecs),
  limit: prop(ThrottleEnvVariable.limit),
};
