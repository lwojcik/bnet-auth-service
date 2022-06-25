import { APP_INFO } from '../APP_INFO';
import { getEnvVar } from '../../../utils';
import { FeaturePrefix, BattleNetEnvVariable } from '../../types';

const { appPrefix } = APP_INFO;
const featurePrefix = FeaturePrefix.battlenet;

const prop = (name: string) =>
  getEnvVar({ appPrefix, featurePrefix, property: name });

export const BATTLENET = {
  region: prop(BattleNetEnvVariable.region),
  clientId: prop(BattleNetEnvVariable.clientId),
  clientSecret: prop(BattleNetEnvVariable.clientSecret),
};
