import { HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { REQUEST } from '@nestjs/core';
import { FastifyRequest } from 'fastify';
import { RedisService } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';
import { ConfigType } from '@nestjs/config';
import { redisConfig } from '../config';
import {
  AccessTokenError,
  AccessTokenObject,
  AccessTokenResponse,
} from '../types';
import { BattleNetService } from '../battlenet/battlenet.service';
import { GetAccessTokenDto } from './dto/get-access-token.dto';

@Injectable()
export class AccessTokenService {
  private readonly cache: Redis;

  constructor(
    private readonly battleNetService: BattleNetService,
    private readonly redisService: RedisService,
    @Inject(REQUEST) private request: FastifyRequest,
    @Inject(redisConfig.KEY)
    private redisConf: ConfigType<typeof redisConfig>,
    @InjectPinoLogger(BattleNetService.name) private readonly logger: PinoLogger
  ) {
    this.cache = this.redisService.getClient();
  }

  private async getAccessTokenFromBattleNet() {
    const accessToken = await this.battleNetService.getAccessToken();

    if ((accessToken as AccessTokenError).error) {
      throw new HttpException(
        {
          ...accessToken,
          requestId: this.request.raw.id,
        },
        (accessToken as AccessTokenError).statusCode
      );
    }

    return accessToken as AccessTokenObject;
  }

  private getAccessTokenFromCache() {
    // return this.cache.getAccessToken()
    return Promise.resolve('todo');
  }

  async getAccessToken(
    getAccessTokenDto: GetAccessTokenDto
  ): Promise<AccessTokenResponse> {
    this.logger.debug(
      `AccessTokenService.getAccessToken(${JSON.stringify(getAccessTokenDto)})`
    );
    // TODO: move Redis logic to a separate 'cache' module

    // const { refresh } = getAccessTokenDto;

    // const getAccessTokenFromCache = await this.getAccessTokenFromCache();
    const accessTokenFromBattleNet = await this.getAccessTokenFromBattleNet();
    return accessTokenFromBattleNet;
    // await this.cache.set('foo123', 'bar456', 'EX', this.redisConf.ttlSecs);
  }
}
