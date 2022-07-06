import { redisConfig } from './redis.config';

describe('redisConfig', () => {
  it('should create Redis config', () => {
    expect(redisConfig()).toMatchSnapshot();
  });
});
