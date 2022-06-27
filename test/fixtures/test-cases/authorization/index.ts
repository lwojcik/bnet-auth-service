import { authorizationEnabled } from './authorization.enabled';
import { authorizationDisabled } from './authorization.disabled';

export const authorization = {
  name: 'Authorization',
  states: [...[authorizationEnabled], ...[authorizationDisabled]],
};
