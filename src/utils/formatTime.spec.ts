import { formatTime } from './formatTime';

describe('formatTime', () => {
  const testTimes = [8, 16, 32, 64, 128, 32768, 128000];

  it('should format time correctly', () => {
    testTimes.forEach((testTime) => {
      expect(formatTime(testTime)).toMatchSnapshot();
    });
  });
});
