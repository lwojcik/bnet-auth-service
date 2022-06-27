import { registerAs } from '@nestjs/config';

export const endpointsConfig = registerAs('endpoints', () => ({
  status: {
    url: '/status',
    method: 'GET',
  },
  accesstoken: {
    url: '/accesstoken[refresh=true]',
    method: 'GET',
  },
}));
