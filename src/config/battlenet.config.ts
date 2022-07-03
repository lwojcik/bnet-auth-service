import { registerAs } from '@nestjs/config';
import { RegionName } from 'blizzapi';
import { BATTLENET } from '../common/constants';

const { env } = process;

export const battleNetConfig = registerAs('battlenet', () => ({
  region: env[BATTLENET.region] as RegionName,
  clientId: env[BATTLENET.clientId],
  clientSecret: env[BATTLENET.clientSecret],
}));
