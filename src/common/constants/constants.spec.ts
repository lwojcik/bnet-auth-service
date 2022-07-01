import * as constants from './index';

describe('constants', () => {
  it('should be defined', () => {
    expect(constants).toMatchSnapshot();
  });
});
