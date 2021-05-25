export const BlizzAPI = jest.fn().mockImplementation(() => ({
  getAccessToken: () => Promise.resolve('sample access token'),
}));
