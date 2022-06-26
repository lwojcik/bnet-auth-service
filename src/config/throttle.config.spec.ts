import { throttleConfig } from './throttle.config';

describe('appConfig', () => {
  it('should create app config', () => {
    expect(throttleConfig()).toMatchSnapshot();
  });
});
