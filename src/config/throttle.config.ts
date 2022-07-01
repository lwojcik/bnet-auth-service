import { registerAs } from '@nestjs/config';
import { DEFAULTS, THROTTLE } from '../common/constants';

const { env } = process;
const defaultValue = DEFAULTS.throttle;

export const throttleConfig = registerAs('throttle', () => ({
  ttlSecs: env[THROTTLE.ttlSecs] || defaultValue.ttlSecs,
  limit: env[THROTTLE.limit] || defaultValue.limit,
}));
