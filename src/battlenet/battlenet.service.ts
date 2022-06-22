import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { BlizzAPI, RegionName } from 'blizzapi';
import { AccessTokenError } from '../common/types';
import { battleNetConfig } from '../config';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class BattleNetService {
  private readonly blizzApi: BlizzAPI;

  constructor(
    @Inject(battleNetConfig.KEY)
    private bnetConfig: ConfigType<typeof battleNetConfig>,
    private readonly logger: LoggerService
  ) {
    this.blizzApi = new BlizzAPI({
      region: this.bnetConfig.region as RegionName,
      clientId: this.bnetConfig.clientId,
      clientSecret: this.bnetConfig.clientSecret,
    });
    this.logger.setLoggedClass(BattleNetService.name);
  }

  async getAccessToken(): Promise<string | AccessTokenError> {
    this.logger.setLoggedMethod(this.getAccessToken.name);
    try {
      this.logger.debug();
      this.logger.debug(
        `Using Battle.net client id: ${this.bnetConfig.clientId}`
      );
      this.logger.debug(
        `Using Battle.net client secret: ${this.bnetConfig.clientSecret}`
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
