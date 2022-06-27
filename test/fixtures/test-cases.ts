import { authorization } from './test-cases/authorization';
import { TestCaseConfig } from './types';

export const testCases: TestCaseConfig[] = [
  ...[authorization],
  // {
  //   name: 'Redis cache',
  //   states: [
  //     {
  //       name: 'enabled',
  //       env_vars: [
  //         {
  //           name: 'BAS_REDIS_ENABLE',
  //           value: 'true',
  //         },
  //       ],
  //     },
  //     {
  //       name: 'disabled',
  //       env_vars: [
  //         {
  //           name: 'BAS_REDIS_ENABLE',
  //           value: 'false',
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   name: 'HTTPS',
  //   states: [
  //     {
  //       name: 'enabled',
  //       env_vars: [],
  //     },
  //     {
  //       name: 'disabled',
  //       env_vars: [],
  //     },
  //   ],
  // },
  // {
  //   name: 'Rate limiting',
  //   states: [
  //     {
  //       name: 'enabled',
  //       env_vars: [],
  //     },
  //     {
  //       name: 'disabled',
  //       env_vars: [],
  //     },
  //   ],
  // },
  // {
  //   name: 'CORS',
  //   states: [
  //     {
  //       name: 'enabled',
  //       env_vars: [],
  //     },
  //     {
  //       name: 'disabled',
  //       env_vars: [],
  //     },
  //   ],
  // },
  // {
  //   name: 'Battle.net credentials',
  //   states: [
  //     {
  //       name: 'configured',
  //       env_vars: [],
  //     },
  //     {
  //       name: 'not configured',
  //       env_vars: [],
  //     },
  //   ],
  // },
];
