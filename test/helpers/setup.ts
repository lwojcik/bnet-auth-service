type EnvironmentVariable = {
  name: string;
  value: string | undefined;
};

const minimalSetup: EnvironmentVariable[] = [
  {
    name: 'NODE_ENV',
    value: 'test',
  },
  {
    name: 'BAS_APP_ENABLE_CORS',
    value: 'false',
  },
  {
    name: 'BAS_APP_CORS_ORIGIN',
    value: undefined,
  },
  {
    name: 'BAS_REDIS_ENABLE',
    value: 'false',
  },
  {
    name: 'BAS_REDIS_HOST',
    value: 'redis',
  },
  {
    name: 'BAS_REDIS_PORT',
    value: '6379',
  },
  {
    name: 'BAS_REDIS_TTL_SECS',
    value: '2000',
  },
  {
    name: 'BAS_REDIS_DB',
    value: '0',
  },
  {
    name: 'BAS_REDIS_KEY_PREFIX',
    value: 'bas',
  },
  {
    name: 'BAS_REDIS_KEY_NAME',
    value: '',
  },
];

export const setupEnvVariable = (
  variableName: string,
  variableValue: string
) => {
  process.env[variableName] = variableValue;
};

export const setupEnvVariables = (envVariables: EnvironmentVariable[]) => {
  envVariables.forEach((variable) => {
    setupEnvVariable(variable.name, variable.value);
  });
};

export const prepareMinimalSetup = () => setupEnvVariables(minimalSetup);
