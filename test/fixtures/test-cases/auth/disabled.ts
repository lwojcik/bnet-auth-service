import {
  placeholderResponse,
  mainDefaultResponse,
  statusDefaultResponse,
} from '../../responses';
import { Endpoint, FeatureStateConfig } from '../../types';

export const authDisabled: FeatureStateConfig = {
  name: 'disabled',
  env_vars: [
    {
      name: 'BAS_AUTH_ENABLE',
      value: 'false',
    },
  ],
  variants: [
    {
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
  ],
};
