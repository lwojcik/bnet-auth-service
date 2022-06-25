import { APP_INFO } from '../APP_INFO';
import { getEnvVar } from '../../../utils';
import { AuthEnvVariable, FeaturePrefix } from '../../types';

const { appPrefix } = APP_INFO;
const featurePrefix = FeaturePrefix.auth;

const prop = (name: string) =>
  getEnvVar({ appPrefix, featurePrefix, property: name });

export const AUTH = {
  enable: prop(AuthEnvVariable.enable),
  username: prop(AuthEnvVariable.username),
  jwtSecret: prop(AuthEnvVariable.jwtSecret),
};
