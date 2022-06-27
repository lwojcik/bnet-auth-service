import { FeatureStateConfig } from '../../types';

export const authorizationDisabled: FeatureStateConfig = {
  name: 'disabled',
  env_vars: [
    {
      name: 'BAS_AUTH_ENABLE',
      value: 'false',
    },
  ],
  response: {
    main: {
      name: 'bnet-auth-service',
      version: '2.0.0',
      caching: true,
      endpoints: {
        status: { url: '/status', method: 'GET' },
        accesstoken: { url: '/accesstoken[refresh=true]', method: 'GET' },
      },
    },
    status: {
      foo: 'bar',
    },
    accesstoken: {
      foo: 'bar',
    },
    accesstokenrefresh: {
      foo: 'bar',
    },
  },
};
