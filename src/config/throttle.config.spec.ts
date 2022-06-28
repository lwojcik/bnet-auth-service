import { throttleConfig } from './throttle.config';

describe('throttleConfig', () => {
  it('should create throttle config', () => {
    expect(throttleConfig()).toMatchSnapshot();
  });
});
