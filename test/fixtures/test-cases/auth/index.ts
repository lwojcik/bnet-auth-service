import { authEnabled } from './enabled';
import { authDisabled } from './disabled';
import { TestCaseConfig } from '../../types';

export const auth: TestCaseConfig = {
  name: 'Authorization',
  states: [...[authEnabled], ...[authDisabled]],
};
