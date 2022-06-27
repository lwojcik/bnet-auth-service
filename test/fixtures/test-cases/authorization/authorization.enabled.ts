import { Endpoint, FeatureStateConfig } from '../../types';

export const authorizationEnabled: FeatureStateConfig = {
  name: 'enabled',
  env_vars: [
    {
      name: 'BAS_AUTH_ENABLE',
      value: 'true',
    },
    {
      name: 'BAS_AUTH_USERNAME',
      value: 'sample_user',
    },
    {
      name: 'BAS_AUTH_JWT_SECRET',
      value: 'sample_jwt_secret',
    },
  ],
  response: {
    [Endpoint.main]: {
      foo: 'bar',
    },
    [Endpoint.status]: {
      foo: 'bar',
    },
    [Endpoint.accesstoken]: {
      foo: 'bar',
    },
    [Endpoint.accesstokenrefresh]: {
      foo: 'bar',
    },
  },
};
