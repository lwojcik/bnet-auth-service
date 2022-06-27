export interface EnvironmentVariableConfig {
  name: string;
  value?: string;
}

export enum Endpoint {
  main = 'main',
  status = 'status',
  accesstoken = 'accesstoken',
  accesstokenrefresh = 'accesstokenrefresh',
}

type ResponseConfig = {
  [key in Endpoint]: object;
};

export type FeatureState =
  | 'enabled'
  | 'disabled'
  | 'configured'
  | 'not configured';

export interface FeatureStateConfig {
  name: FeatureState;
  env_vars: EnvironmentVariableConfig[];
  response: ResponseConfig;
}

export interface TestCaseConfig {
  name: string;
  states: FeatureStateConfig[];
}

export type TestCaseConfigs = TestCaseConfig[];
