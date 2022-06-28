import {
  mainDefaultResponse,
  placeholderResponse,
  statusDefaultResponse,
  unauthorizedResponse,
} from '../../responses';
import { Endpoint, FeatureStateConfig } from '../../types';

export const authEnabled: FeatureStateConfig = {
  name: 'enabled',
  env_vars: [
    {
      name: 'BAS_AUTH_ENABLE',
      value: 'true',
    },
    {
      name: 'BAS_AUTH_USERNAME',
      value: 'sample_user_from_test_case',
    },
    {
      name: 'BAS_AUTH_JWT_SECRET',
      value: 'sample_jwt_secret_from_test_case',
    },
  ],
  variants: [
    {
      name: 'Correct JWT provided',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhbXBsZV91c2VyX2Zyb21fdGVzdF9jYXNlIn0.pMMhFsBT72jj05D-9c_ZA7gyMPKT7AdXf-x_9SFxtjc',
      },
      response: {
        [Endpoint.main]: mainDefaultResponse,
        [Endpoint.status]: statusDefaultResponse,
        [Endpoint.accesstoken]: placeholderResponse,
        [Endpoint.accesstokenrefresh]: placeholderResponse,
      },
      properties: {
        [Endpoint.status]: ['status', 'timestamp', 'uptime'],
      },
    },
    {
      name: 'Incorrect JWT provided',
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImluY29ycmVjdF91c2VyX2Zyb21fdGVzdF9jYXNlIn0.zSja22nnCL02vo_Ipi_-OZLJqoyu3emaNhIC3jvu4w8`,
      },
      response: {
        [Endpoint.main]: unauthorizedResponse,
        [Endpoint.status]: unauthorizedResponse,
        [Endpoint.accesstoken]: unauthorizedResponse,
        [Endpoint.accesstokenrefresh]: unauthorizedResponse,
      },
    },
    {
      name: 'No JWT provided',
      response: {
        [Endpoint.main]: unauthorizedResponse,
        [Endpoint.status]: unauthorizedResponse,
        [Endpoint.accesstoken]: unauthorizedResponse,
        [Endpoint.accesstokenrefresh]: unauthorizedResponse,
      },
    },
  ],
};
