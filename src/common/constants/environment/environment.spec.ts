import * as environment from './index';

describe('environment constants', () => {
  it('should be defined', () => {
    expect(environment).toMatchSnapshot();
  });
});
