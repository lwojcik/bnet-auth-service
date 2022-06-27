import { EnvironmentVariableConfig } from './types';

export const minimalSetup: EnvironmentVariableConfig[] = [
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
    name: 'BES_REDIS_KEY_NAME',
    value: '',
  },
];
