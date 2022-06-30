const mainResponse = (caching: boolean) => ({
  name: 'bnet-auth-service',
  version: '2.0.0',
  caching,
  endpoints: {
    status: {
      url: '/status',
      method: 'GET',
    },
    accesstoken: {
      url: '/accesstoken',
      method: 'GET',
    },
    accesstokenrefresh: {
      url: '/accesstoken?refresh=true',
      method: 'GET',
    },
  },
});

export const mainResponseWithCaching = mainResponse(true);

export const mainResponseWithoutCaching = mainResponse(false);
