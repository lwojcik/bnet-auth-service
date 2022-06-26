import { PHRASES } from './PHRASES';

const fnsToTest = [
  {
    feature: 'accessToken',
    items: [
      {
        name: 'received',
        arg: 'receivedTestAccessToken',
      },
      {
        name: 'cachingAccessToken',
        arg: 'testAccessTokenToCache',
      },
    ],
  },
  {
    feature: 'battlenet',
    items: [
      {
        name: 'usingClientId',
        arg: 'testCliendId',
      },
      {
        name: 'usingClientSecret',
        arg: 'testClientSecret',
      },
      {
        name: 'receivedAccessToken',
        arg: 'receivedTestAccessToken',
      },
    ],
  },
  {
    feature: 'cache',
    items: [
      {
        name: 'usingKey',
        arg: 'testCacheKey',
      },
      {
        name: 'usingTTL',
        arg: 'testTTLinSecs',
      },
    ],
  },
];

describe('Phrases', () => {
  it('should be defined', () => {
    expect(PHRASES).toMatchSnapshot();
  });

  it('should format phrases correctly', () => {
    fnsToTest.forEach((testedFn) => {
      testedFn.items.forEach((item) => {
        expect(
          PHRASES[testedFn.feature][item.name](item.arg)
        ).toMatchSnapshot();
      });
    });
  });
});
