import { APP_INFO } from '../APP_INFO';
import { getEnvVar } from '../../../utils';
import { AppEnvVariable, FeaturePrefix } from '../../types';

const { appPrefix } = APP_INFO;
const featurePrefix = FeaturePrefix.app;

const prop = (property: string) =>
  getEnvVar({ appPrefix, featurePrefix, property });

export const APP = {
  environment: AppEnvVariable.environment,
  host: prop(AppEnvVariable.host),
  port: prop(AppEnvVariable.port),
  enableCors: prop(AppEnvVariable.enableCors),
  corsOrigin: prop(AppEnvVariable.corsOrigin),
};
