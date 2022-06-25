import { registerAs } from '@nestjs/config';
import { AUTH, DEFAULTS } from '../common/constants';

const { env } = process;
const defaultValue = DEFAULTS.auth;

export const authConfig = registerAs('auth', () => ({
  enable: env[AUTH.enable] || defaultValue.enable,
  username: env[AUTH.username] || defaultValue.username,
  jwtSecret: env[AUTH.jwtSecret] || defaultValue.jwtSecret,
}));
