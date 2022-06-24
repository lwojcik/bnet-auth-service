import { RedisService } from '@liaoliaots/nestjs-redis';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import Redis from 'ioredis';
import { LoggerService } from '../logger/logger.service';
import { redisConfig } from '../config';
import { PHRASES } from '../common/constants';

@Injectable()
export class CacheService {
  private readonly cache: Redis;

  private readonly cacheKey: string;

  constructor(
    private readonly redisService: RedisService,
    @Inject(redisConfig.KEY)
    private redisConf: ConfigType<typeof redisConfig>,
    private readonly logger: LoggerService
  ) {
    this.cache = this.redisService.getClient();
    this.cacheKey = `:${this.redisConf.keyName}`;
    this.logger.setLoggedClass(CacheService.name);
  }

  saveAccessToken(accessToken: string) {
    this.logger.setLoggedMethod(this.saveAccessToken.name, accessToken);
    this.logger.debug();

    if (!this.redisConf.enable) {
      this.logger.debug(PHRASES.cache.accessKeyNotSaved);
    } else {
      this.logger.debug(
        PHRASES.cache.usingKey(`${this.redisConf.keyPrefix}${this.cacheKey}`)
      );

      this.logger.debug(PHRASES.cache.usingTTL(this.redisConf.ttlSecs));

      this.cache.set(this.cacheKey, accessToken, 'EX', this.redisConf.ttlSecs);
    }
  }

  async getAccessToken() {
    this.logger.setLoggedMethod(this.getAccessToken.name);
    this.logger.debug();

    if (!this.redisConf.enable) {
      this.logger.debug(PHRASES.cache.cacheServiceDisabled);
      return null;
    }

    this.logger.debug(
      PHRASES.cache.usingKey(`${this.redisConf.keyPrefix}${this.cacheKey}`)
    );

    const accessToken = await this.cache.get(this.cacheKey);

    this.logger.debug(`${PHRASES.accessToken.received(accessToken)}`);

    return accessToken;
  }
}
