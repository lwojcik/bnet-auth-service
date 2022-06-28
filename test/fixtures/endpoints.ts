export const endpoints = [
  {
    name: 'main',
    url: '/',
    method: 'GET',
  },
  {
    name: 'status',
    url: '/status',
    method: 'GET',
  },
  {
    name: 'accesstoken',
    url: '/accesstoken',
    method: 'GET',
  },
  {
    name: 'accesstokenrefresh',
    url: '/accesstoken?refresh=true',
    method: 'GET',
  },
];
