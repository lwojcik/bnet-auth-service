import { appConfig } from './app.config';

describe('appConfig', () => {
  it('should create app config', () => {
    expect(appConfig()).toMatchSnapshot();
  });
});
