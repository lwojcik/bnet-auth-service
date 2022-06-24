import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ApiResponse } from '../common/types';
import { LoggerService } from '../logger/logger.service';
import { AccessTokenService } from './accesstoken.service';
import { AccessTokenError } from './dto/access-token-error.dto';
import { AccessTokenObject } from './dto/access-token-object.dto';
import { GetAccessTokenDto } from './dto/get-access-token.dto';

@ApiTags('accesstoken')
@Controller('accesstoken')
export class AccessTokenController {
  constructor(
    private readonly accessTokenService: AccessTokenService,
    private readonly logger: LoggerService
  ) {
    this.logger.setLoggedClass(AccessTokenController.name);
  }

  @Get()
  @ApiOkResponse({
    description: ApiResponse.ok,
    type: AccessTokenObject,
  })
  @ApiUnauthorizedResponse({
    description: ApiResponse.unauthorized,
    type: AccessTokenError,
  })
  @ApiOperation({
    summary: 'Get Battle.net access token for supplied client credentials',
  })
  getAccessToken(@Query() getAccessTokenDto: GetAccessTokenDto) {
    this.logger.setLoggedMethod(this.getAccessToken.name, getAccessTokenDto);
    this.logger.debug();
    return this.accessTokenService.getAccessToken(getAccessTokenDto);
  }
}
