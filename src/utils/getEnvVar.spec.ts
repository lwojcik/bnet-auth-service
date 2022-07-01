import { getEnvVar } from './getEnvVar';

describe('getEnvVar', () => {
  const testAppPrefixes = ['TEST_APP1', 'TEST_APP2'];

  const testFeaturePrefixes = ['FEATURE1', 'FEATURE2', 'FEATURE3'];

  const testProperties = ['PROPERTY1', 'PROPERTY2', 'PROPERTY3'];

  it('should generate correct environment variable names', () => {
    testAppPrefixes.forEach((appPrefix) => {
      testFeaturePrefixes.forEach((featurePrefix) => {
        testProperties.forEach((property) => {
          expect(
            getEnvVar({ appPrefix, featurePrefix, property })
          ).toMatchSnapshot();

          expect(getEnvVar({ featurePrefix, property })).toMatchSnapshot();

          expect(getEnvVar({ property })).toMatchSnapshot();
        });
      });
    });
  });
});
