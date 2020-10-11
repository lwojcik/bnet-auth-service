class BlizzAPI {
  // eslint-disable-next-line class-methods-use-this
  getAccessToken(): Promise<string> {
    return new Promise((resolve) => {
      resolve('sample access token');
    });
  }
}

export default BlizzAPI;
