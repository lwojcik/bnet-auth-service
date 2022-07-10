import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { LoggerService } from '../logger/logger.service';
import { AccessTokenService } from '../accesstoken/accesstoken.service';

@Injectable()
export class CronService {
  constructor(
    private readonly logger: LoggerService,
    private readonly accessTokenService: AccessTokenService
  ) {}

  @Cron(process.env.BAS_CRON_PATTERN)
  handleCron() {
    this.logger.debug('Refreshing access token via cron...');
    this.accessTokenService.getAccessToken(true);
  }
}
