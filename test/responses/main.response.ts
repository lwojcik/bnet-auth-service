export const mainResponse = {
  name: 'bnet-auth-service',
  version: '2.0.0',
  caching: true,
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
};
