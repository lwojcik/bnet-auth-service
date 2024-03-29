import { Inject, Injectable } from '@nestjs/common';
import { RequestContext } from 'nestjs-request-context';
import { ConfigType } from '@nestjs/config';
import { Source } from '../common/types';
import { BattleNetService } from '../battlenet/battlenet.service';
import { CacheService } from '../cache/cache.service';
import { LoggerService } from '../logger/logger.service';
import { AccessTokenError } from './dto/access-token-error.dto';
import { AccessTokenObject } from './dto/access-token-object.dto';
import { redisConfig } from '../config';

@Injectable()
export class AccessTokenService {
  constructor(
    private readonly battleNetService: BattleNetService,
    private readonly cacheService: CacheService,
    @Inject(redisConfig.KEY)
    private readonly redisConf: ConfigType<typeof redisConfig>,
    private readonly logger: LoggerService
  ) {}

  private async getAccessTokenFromBattleNet() {
    const accessToken = await this.battleNetService.getAccessToken();

    if ((accessToken as AccessTokenError).error) {
      this.logger.error('Received access token error from Battle.net!');
      this.logger.error((accessToken as AccessTokenError).error);

      return {
        ...(accessToken as AccessTokenError),
        id: RequestContext.currentContext.req.id,
        statusCode: (accessToken as AccessTokenError).statusCode,
      };
    }

    return accessToken;
  }

  private async getAccessTokenFromCache(): Promise<string> {
    const accessToken = await this.cacheService.getAccessToken();

    this.logger.debug(`Received access token from cache!`);

    return accessToken;
  }

  private cacheAccessToken(accessToken: string) {
    return this.cacheService.saveAccessToken(accessToken);
  }

  async getAccessToken(
    refresh = false
  ): Promise<AccessTokenObject | AccessTokenError> {
    if (this.redisConf.enable && !refresh) {
      this.logger.debug('Redis cache is enabled');
      this.logger.debug('Checking for cached access token...');

      const accessTokenFromCache = await this.getAccessTokenFromCache();

      if (accessTokenFromCache) {
        this.logger.debug(`Found cached access token!`);

        return {
          accessToken: accessTokenFromCache,
          source: Source.cache,
        };
      }

      this.logger.debug('No cached access token found!');
    }

    this.logger.debug('Redis cache is disabled OR refresh was triggered');
    this.logger.debug('Getting access token from Battle.net...');

    const accessTokenFromBattleNet = await this.getAccessTokenFromBattleNet();

    if ((accessTokenFromBattleNet as AccessTokenError).error) {
      return accessTokenFromBattleNet as AccessTokenError;
    }

    if (this.redisConf.enable) {
      this.logger.debug(`Caching access token...`);
      this.cacheAccessToken(accessTokenFromBattleNet as string);
    }

    return {
      accessToken: accessTokenFromBattleNet as string,
      source: Source.battlenet,
    };
  }
}
