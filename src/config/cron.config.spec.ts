import { cronConfig } from './cron.config';

describe('cronConfig', () => {
  it('should create cron config', () => {
    expect(cronConfig()).toMatchSnapshot();
  });
});
