import { registerAs } from '@nestjs/config';
import { RegionName } from 'blizzapi';

export const battleNetConfig = registerAs('battlenet', () => ({
  region: process.env.BAS_BATTLENET_REGION as RegionName,
  clientId: process.env.BAS_BATTLENET_CLIENT_ID,
  clientSecret: process.env.BAS_BATTLENET_CLIENT_SECRET,
}));
