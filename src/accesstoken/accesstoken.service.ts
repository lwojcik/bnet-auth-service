import { HttpException, Injectable } from '@nestjs/common';
import { RequestContext } from 'nestjs-request-context';
import { Source } from '../common/types';
import { BattleNetService } from '../battlenet/battlenet.service';
import { GetAccessTokenDto } from './dto/get-access-token.dto';
import { CacheService } from '../cache/cache.service';
import { LoggerService } from '../logger/logger.service';
import { PHRASES } from '../common/constants';
import { AccessTokenError } from './dto/access-token-error.dto';
import { AccessTokenObject } from './dto/access-token-object.dto';

@Injectable()
export class AccessTokenService {
  constructor(
    private readonly battleNetService: BattleNetService,
    private readonly cacheService: CacheService,
    private readonly logger: LoggerService
  ) {
    this.logger.setLoggedClass(AccessTokenService.name);
  }

  private async getAccessTokenFromBattleNet() {
    this.logger.setLoggedMethod(this.getAccessTokenFromBattleNet.name);

    this.logger.debug();

    const accessToken = await this.battleNetService.getAccessToken();

    if ((accessToken as AccessTokenError).error) {
      this.logger.debug(PHRASES.errors.accessToken);

      this.logger.error((accessToken as AccessTokenError).error);

      throw new HttpException(
        {
          ...(accessToken as AccessTokenError),
          id: RequestContext.currentContext.req.id,
        },
        (accessToken as AccessTokenError).statusCode
      );
    }

    return accessToken;
  }

  private async getAccessTokenFromCache(): Promise<string> {
    this.logger.setLoggedMethod(this.getAccessTokenFromCache.name);

    const accessToken = await this.cacheService.getAccessToken();

    this.logger.debug(PHRASES.accessToken.received(accessToken));

    return accessToken;
  }

  private cacheAccessToken(accessToken: string) {
    this.logger.setLoggedMethod(this.cacheAccessToken.name, accessToken);
    this.logger.debug();

    return this.cacheService.saveAccessToken(accessToken);
  }

  async getAccessToken(
    getAccessTokenDto: GetAccessTokenDto
  ): Promise<AccessTokenObject | AccessTokenError> {
    this.logger.setLoggedMethod(this.getAccessToken.name, getAccessTokenDto);

    this.logger.debug();

    const { refresh } = getAccessTokenDto;

    this.logger.debug(PHRASES.accessToken.readingFromCache);
    const accessTokenFromCache = await this.getAccessTokenFromCache();

    if (refresh || !accessTokenFromCache) {
      this.logger.debug(PHRASES.accessToken.noCachedAccessToken);

      const accessTokenFromBattleNet = await this.getAccessTokenFromBattleNet();

      if ((accessTokenFromBattleNet as AccessTokenError).error) {
        this.logger.error(PHRASES.errors.accessToken);
        return accessTokenFromBattleNet as AccessTokenError;
      }

      this.logger.debug(
        PHRASES.accessToken.cachingAccessToken(
          accessTokenFromBattleNet as string
        )
      );

      this.cacheAccessToken(accessTokenFromBattleNet as string);

      return {
        accessToken: accessTokenFromBattleNet as string,
        source: Source.battlenet,
      };
    }

    return {
      accessToken: accessTokenFromCache,
      source: Source.cache,
    };
  }
}
