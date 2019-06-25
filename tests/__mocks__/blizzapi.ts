interface AccessTokenObject {
  accessToken: string,
}

class BlizzAPI {
  constructor() {}

  getAccessToken(): Promise<AccessTokenObject> {
    return new Promise((resolve) => {
      resolve({
        accessToken: 'sample access token',
      });
    });
  }
}

export {
  BlizzAPI,
}