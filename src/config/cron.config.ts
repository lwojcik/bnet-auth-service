import { registerAs } from '@nestjs/config';

export const cronConfig = registerAs('cron', () => ({
  enable: process.env.BAS_CRON_ENABLE === 'true',
  pattern: process.env.BAS_CRON_PATTERN,
}));
