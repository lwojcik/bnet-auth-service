import { RedisService } from '@liaoliaots/nestjs-redis';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import Redis from 'ioredis';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { redisConfig } from '../config';

@Injectable()
export class CacheService {
  private readonly cache: Redis;

  private readonly cacheKey: string;

  constructor(
    private readonly redisService: RedisService,
    @Inject(redisConfig.KEY)
    private redisConf: ConfigType<typeof redisConfig>,
    @InjectPinoLogger(CacheService.name) private readonly logger: PinoLogger
  ) {
    this.cache = this.redisService.getClient();
    this.cacheKey = `:${this.redisConf.keyName}`;
  }

  saveAccessToken(accessToken: string) {
    this.logger.debug(`CacheService.saveAccessToken('${accessToken}')`);

    this.logger.debug(
      `CacheService.getAccessToken(): Using Redis key: ${this.redisConf.keyPrefix}${this.cacheKey}`
    );

    this.logger.debug(
      `CacheService.getAccessToken(): Using TTL in seconds: ${this.redisConf.ttlSecs}`
    );

    this.cache.set(this.cacheKey, accessToken, 'EX', this.redisConf.ttlSecs);
  }

  async getAccessToken() {
    this.logger.debug('CacheService.getAccessToken()');

    this.logger.debug(
      `CacheService.getAccessToken(): Using Redis key: ${this.redisConf.keyPrefix}${this.cacheKey}`
    );

    const accessToken = await this.cache.get(this.cacheKey);

    this.logger.debug(
      `CacheService.getAccessToken(): Received access token: ${accessToken}`
    );

    return accessToken;
  }
}
