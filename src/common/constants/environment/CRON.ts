import { getEnvVar } from '../../../utils';
import { CronEnvVariable, FeaturePrefix } from '../../types';
import { APP_INFO } from '../APP_INFO';

const { appPrefix } = APP_INFO;
const featurePrefix = FeaturePrefix.cron;

const prop = (name: string) =>
  getEnvVar({ appPrefix, featurePrefix, property: name });

export const CRON = {
  enable: prop(CronEnvVariable.enable),
  pattern: prop(CronEnvVariable.pattern),
};
