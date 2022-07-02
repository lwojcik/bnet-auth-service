/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
const dotenv = require('dotenv');

dotenv.config({ path: './env.test' });

jest.mock('ioredis', () => require('ioredis-mock'));
