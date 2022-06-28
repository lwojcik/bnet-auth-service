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

export interface ResponseType<StatusCode = number, DataType = object> {
  statusCode: StatusCode;
  data?: DataType;
  properties?: string[];
}

type ResponseConfig = {
  [key in Endpoint]?: ResponseType;
};

type PropertyConfig = {
  [key in Endpoint]?: string[];
};

export type FeatureState =
  | 'enabled'
  | 'disabled'
  | 'configured'
  | 'not configured';

export interface FeatureStateConfig {
  name: FeatureState;
  env_vars: EnvironmentVariableConfig[];
  variants: {
    name?: string;
    headers?: object;
    response?: ResponseConfig;
    properties?: PropertyConfig;
  }[];
}

export interface TestCaseConfig {
  name: string;
  states: FeatureStateConfig[];
}

export type TestCaseConfigs = TestCaseConfig[];
