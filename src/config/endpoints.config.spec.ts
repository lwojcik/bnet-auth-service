import { endpointsConfig } from './endpoints.config';

describe('endpointsConfig', () => {
  it('should create endpoints config', () => {
    expect(endpointsConfig()).toMatchSnapshot();
  });
});
