import { HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { REQUEST } from '@nestjs/core';
import { FastifyRequest } from 'fastify';
import {
  AccessTokenError,
  AccessTokenObject,
  AccessTokenResponse,
} from '../types';
import { BattleNetService } from '../battlenet/battlenet.service';
import { GetAccessTokenDto } from './dto/get-access-token.dto';

@Injectable()
export class AccessTokenService {
  constructor(
    private readonly battleNetService: BattleNetService,
    @Inject(REQUEST) private request: FastifyRequest,
    @InjectPinoLogger(BattleNetService.name) private readonly logger: PinoLogger
  ) {}

  async getAccessToken(
    getAccessTokenDto: GetAccessTokenDto
  ): Promise<AccessTokenResponse> {
    this.logger.debug(
      `AccessTokenService.getAccessToken(${JSON.stringify(getAccessTokenDto)})`
    );

    // const { refresh } = getAccessTokenDto;

    const accessTokenResponse = await this.battleNetService.getAccessToken();

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
