import { registerAs } from '@nestjs/config';

export const endpointsConfig = registerAs('endpoints', () => ({
  status: '/status',
  accesstoken: '/accesstoken',
}));
