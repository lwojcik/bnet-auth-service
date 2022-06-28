import {
  placeholderResponse,
  mainDefaultResponse,
  statusDefaultResponse,
} from '../../responses';
import { Endpoint, FeatureStateConfig } from '../../types';

export const battlenetUnonfigured: FeatureStateConfig = {
  name: 'not configured',
  env_vars: [
    {
      name: 'BAS_BATTLENET_CLIENT_ID',
      value: 'test-batttlenet-client-id',
    },
    {
      name: 'BAS_BATTLENET_CLIENT_SECRET',
      value: 'test-batttlenet-client-secret',
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
