import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { BlizzAPI, RegionName } from 'blizzapi';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { AccessTokenError } from '../types';
import { battleNetConfig } from '../config';

@Injectable()
export class BattleNetService {
  private readonly blizzApi: BlizzAPI;

  constructor(
    @Inject(battleNetConfig.KEY)
    private bnetConfig: ConfigType<typeof battleNetConfig>,
    @InjectPinoLogger(BattleNetService.name) private readonly logger: PinoLogger
  ) {
    this.blizzApi = new BlizzAPI({
      region: this.bnetConfig.region as RegionName,
      clientId: this.bnetConfig.clientId,
      clientSecret: this.bnetConfig.clientSecret,
    });
  }

  async getAccessToken(): Promise<string | AccessTokenError> {
    try {
      this.logger.debug('BattleNetService.getAccessToken()');
      this.logger.debug(
        `BattleNetService.getAccessToken(): Using Battle.net client id: ${this.bnetConfig.clientId}`
      );
      this.logger.debug(
        `BattleNetService.getAccessToken(): Using Battle.net client secret: ${this.bnetConfig.clientSecret}`
      );

      const accessToken = await this.blizzApi.getAccessToken();

      this.logger.debug(
        `BattleNetService.getAccessToken(): Received access token: ${accessToken}`
      );

      return accessToken;
    } catch (error) {
      this.logger.error(error);

      return {
        error: true,
        statusCode: error.response.status,
        message: error.message,
      } as AccessTokenError;
    }
  }
}
