import { registerAs } from '@nestjs/config';

export const authConfig = registerAs('auth', () => ({
  enable: process.env.BAS_AUTH_ENABLE === 'true',
  username: process.env.BAS_AUTH_USERNAME,
  jwtSecret: process.env.BAS_AUTH_JWT_SECRET,
}));
