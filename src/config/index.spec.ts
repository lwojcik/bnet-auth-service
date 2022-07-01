import * as config from './index';

describe('config', () => {
  it('should be defined', () => {
    expect(config).toMatchSnapshot();
  });
});
