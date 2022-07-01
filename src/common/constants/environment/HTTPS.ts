import { APP_INFO } from '../APP_INFO';
import { getEnvVar } from '../../../utils';
import { FeaturePrefix, HttpsEnvVariable } from '../../types';

const { appPrefix } = APP_INFO;
const featurePrefix = FeaturePrefix.https;

const prop = (name: string) =>
  getEnvVar({ appPrefix, featurePrefix, property: name });

export const HTTPS = {
  enable: prop(HttpsEnvVariable.enable),
  keyPath: prop(HttpsEnvVariable.keyPath),
  certPath: prop(HttpsEnvVariable.certPath),
};
