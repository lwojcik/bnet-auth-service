import { TestCaseConfig } from '../../types';
import { battlenetConfigured } from './configured';
import { battlenetUnonfigured } from './unconfigured';

export const battlenet: TestCaseConfig = {
  name: 'Battle.net',
  states: [...[battlenetConfigured], ...[battlenetUnonfigured]],
};
