import { HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { REQUEST } from '@nestjs/core';
import { FastifyRequest } from 'fastify';
import { RedisService } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';
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
    @InjectPinoLogger(BattleNetService.name) private readonly logger: PinoLogger
  ) {
    this.cache = this.redisService.getClient();
  }

  async getAccessToken(
    getAccessTokenDto: GetAccessTokenDto
  ): Promise<AccessTokenResponse> {
    this.logger.debug(
      `AccessTokenService.getAccessToken(${JSON.stringify(getAccessTokenDto)})`
    );
    // TODO: move Redis logic to a separate 'cache' module

    // const { refresh } = getAccessTokenDto;

    const accessTokenResponse = await this.battleNetService.getAccessToken();
    // await this.cache.set('foo123', 'bar456');

    if ((accessTokenResponse as AccessTokenError).error) {
      throw new HttpException(
        {
          ...accessTokenResponse,
          requestId: this.request.raw.id,
        },
        (accessTokenResponse as AccessTokenError).statusCode
      );
    }

    return accessTokenResponse as AccessTokenObject;
  }
}
