import { registerAs } from '@nestjs/config';
import { BATTLENET } from '../common/common.constants';

const { env } = process;

export const battleNetConfig = registerAs('battlenet', () => ({
  region: env[BATTLENET.region],
  clientId: env[BATTLENET.clientId],
  clientSecret: env[BATTLENET.clientSecret],
}));
