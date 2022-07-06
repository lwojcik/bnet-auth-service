import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { BlizzAPI } from 'blizzapi';
import { ApiErrorCode } from '../common/types';
import { battleNetConfig } from '../config';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class BattleNetService {
  private readonly blizzApi: BlizzAPI;

  constructor(
    @Inject(battleNetConfig.KEY)
    private readonly bnetConfig: ConfigType<typeof battleNetConfig>,
    private readonly logger: LoggerService
  ) {
    this.blizzApi = new BlizzAPI({
      region: this.bnetConfig.region,
      clientId: this.bnetConfig.clientId,
      clientSecret: this.bnetConfig.clientSecret,
    });
  }

  async getAccessToken() {
    try {
      const accessToken = await this.blizzApi.getAccessToken();

      this.logger.debug(`Received access token: ${accessToken}`);

      return accessToken;
    } catch (error) {
      this.logger.error(error);

      return {
        error: ApiErrorCode.bnetApiError,
        statusCode: error.response.status,
        message: error.message,
      };
    }
  }
}
