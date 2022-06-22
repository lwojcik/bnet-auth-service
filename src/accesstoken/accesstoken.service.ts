import { HttpException, Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { RequestContext } from 'nestjs-request-context';
import { AccessTokenError, AccessTokenObject } from '../types';
import { BattleNetService } from '../battlenet/battlenet.service';
import { GetAccessTokenDto } from './dto/get-access-token.dto';
import { CacheService } from '../cache/cache.service';

@Injectable()
export class AccessTokenService {
  constructor(
    private readonly battleNetService: BattleNetService,
    private readonly cacheService: CacheService,
    @InjectPinoLogger(BattleNetService.name) private readonly logger: PinoLogger
  ) {}

  private async getAccessTokenFromBattleNet() {
    this.logger.debug('AccessTokenService.getAccessTokenFromBattleNet()');

    const accessToken = await this.battleNetService.getAccessToken();

    if ((accessToken as AccessTokenError).error) {
      this.logger.debug(
        `AccessTokenService.getAccessTokenFromBattleNet(): Received access token error`
      );

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
    this.logger.debug(`AccessTokenService.getAccessTokenFromCache()`);

    const accessToken = await this.cacheService.getAccessToken();

    this.logger.debug(
      `AccessTokenService.getAccessTokenFromCache(): Received access token: ${accessToken}`
    );

    return accessToken;
  }

  private cacheAccessToken(accessToken: string) {
    this.logger.debug(`AccessTokenService.cacheAccessToken('${accessToken}')`);
    return this.cacheService.saveAccessToken(accessToken);
  }

  async getAccessToken(
    getAccessTokenDto: GetAccessTokenDto
  ): Promise<AccessTokenObject | AccessTokenError> {
    this.logger.debug(
      `AccessTokenService.getAccessToken(${JSON.stringify(getAccessTokenDto)})`
    );

    const { refresh } = getAccessTokenDto;

    const accessTokenFromCache = await this.getAccessTokenFromCache();

    if (refresh || !accessTokenFromCache) {
      this.logger.debug(
        `AccessTokenService.getAccessToken(${JSON.stringify(
          getAccessTokenDto
        )}): Found no cached access key or 'refresh' option was used`
      );

      const accessTokenFromBattleNet = await this.getAccessTokenFromBattleNet();

      if ((accessTokenFromBattleNet as AccessTokenError).error) {
        this.logger.error(
          `AccessTokenService.getAccessToken(${JSON.stringify(
            getAccessTokenDto
          )}): Received access token error`
        );
        return accessTokenFromBattleNet as AccessTokenError;
      }

      this.logger.debug(
        `AccessTokenService.getAccessToken(${JSON.stringify(
          getAccessTokenDto
        )}): Caching received access token: ${accessTokenFromBattleNet}`
      );

      this.cacheAccessToken(accessTokenFromBattleNet as string);

      return {
        accessToken: accessTokenFromBattleNet as string,
      } as AccessTokenObject;
    }

    return {
      accessToken: accessTokenFromCache,
    };
  }
}
