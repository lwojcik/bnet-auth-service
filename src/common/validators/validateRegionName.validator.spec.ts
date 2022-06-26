import { validateRegionName } from './validateRegionName.validator';

const correctRegionNames = ['eu', 'us', 'kr', 'cn'];

describe('validateRegionName', () => {
  it('should validate correct region names positively', () => {
    correctRegionNames.forEach((regionName) => {
      expect(validateRegionName(regionName)).toEqual(true);
    });
  });

  it('should throw RangeError for invalid region names', () => {
    expect(() => {
      validateRegionName('de');
    }).toThrowError(RangeError);
  });
});
