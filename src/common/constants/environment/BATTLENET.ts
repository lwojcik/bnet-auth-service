import { APP_INFO } from '../APP_INFO';
import { getEnvVar } from '../../../utils';
import { BattleNetEnvVariable } from '../../types/BattleNetEnvVariable';
import { FeaturePrefix } from '../../types/FeaturePrefix';

const { appPrefix } = APP_INFO;
const featurePrefix = FeaturePrefix.battlenet;

const prop = (name: string) =>
  getEnvVar({ appPrefix, featurePrefix, property: name });

export const BATTLENET = {
  region: prop(BattleNetEnvVariable.region),
  clientId: prop(BattleNetEnvVariable.clientId),
  clientSecret: prop(BattleNetEnvVariable.clientSecret),
};
