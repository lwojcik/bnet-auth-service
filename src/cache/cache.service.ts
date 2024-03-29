import { RedisService } from '@liaoliaots/nestjs-redis';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import Redis from 'ioredis';
import { LoggerService } from '../logger/logger.service';
import { redisConfig } from '../config';

@Injectable()
export class CacheService {
  private readonly cache: Redis;

  private readonly cacheKey: string;

  constructor(
    private readonly redisService: RedisService,
    @Inject(redisConfig.KEY)
    private readonly redisConf: ConfigType<typeof redisConfig>,
    private readonly logger: LoggerService
  ) {
    this.cache = this.redisService.getClient();
    this.cacheKey = `:${this.redisConf.keyName}`;
  }

  saveAccessToken(accessToken: string) {
    if (!this.redisConf.enable) {
      this.logger.debug('BAS_REDIS_ENABLE set to false - access key not saved');
    } else {
      this.logger.debug(
        `Using Redis key: ${this.redisConf.keyPrefix}${this.cacheKey}`
      );

      this.logger.debug(`TTL set to ${this.redisConf.ttlSecs} seconds`);

      this.cache.set(this.cacheKey, accessToken, 'EX', this.redisConf.ttlSecs);
    }
  }

  async getAccessToken() {
    if (!this.redisConf.enable) {
      this.logger.debug(
        `BAS_REDIS_ENABLE set to false - returning 'null' as access key`
      );
      return null;
    }

    this.logger.debug(
      `Using Redis key: ${this.redisConf.keyPrefix}${this.cacheKey}`
    );

    const accessToken = await this.cache.get(this.cacheKey);

    this.logger.debug(`Received access token from cache!`);

    return accessToken;
  }
}
