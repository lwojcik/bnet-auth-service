import { registerAs } from '@nestjs/config';
import { trueStringToBoolean } from '../utils/trueStringToBoolean';
import { CRON, DEFAULTS } from '../common/constants';

const { env } = process;
const defaultValue = DEFAULTS.cron;

export const cronConfig = registerAs('cron', () => ({
  enable: trueStringToBoolean({ value: process.env[CRON.enable] }),
  pattern: env[CRON.pattern] || defaultValue.pattern,
}));
