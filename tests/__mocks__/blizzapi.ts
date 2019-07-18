class BlizzAPI {
  constructor() {}

  getAccessToken(): Promise<string> {
    return new Promise((resolve) => {
      resolve('sample access token');
    });
  }
}

export default BlizzAPI;