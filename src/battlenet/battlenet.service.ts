import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { BlizzAPI, RegionName } from 'blizzapi';
import { PHRASES } from '../common/constants';
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
    this.logger.debug();

    try {
      this.logger.debug(
        PHRASES.battlenet.usingClientId(this.bnetConfig.clientId)
      );
      this.logger.debug(
        PHRASES.battlenet.usingClientSecret(this.bnetConfig.clientSecret)
      );

      const accessToken = await this.blizzApi.getAccessToken();

      this.logger.debug(PHRASES.battlenet.receivedAccessToken(accessToken));

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
