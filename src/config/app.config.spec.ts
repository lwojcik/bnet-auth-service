import { appConfig } from './app.config';

describe('appConfig', () => {
  const OLD_ENV = process.env;

  beforeEach(async () => {
    process.env = { ...OLD_ENV };
  });

  it('should create app config', () => {
    expect(appConfig()).toMatchSnapshot();
  });
});
