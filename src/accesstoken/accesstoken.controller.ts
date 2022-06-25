import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { TooManyRequestsError } from '../common/dto/too-many-requests-error.dto';
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
    description:
      'Successful response. Note that in case of Battle.net errors the application will still return status code 200 and AccessTokenError response.',
    type: AccessTokenObject,
  })
  @ApiUnauthorizedResponse({
    description: ApiResponse.unauthorized,
    type: AccessTokenError,
  })
  @ApiTooManyRequestsResponse({
    description: ApiResponse.tooManyRequests,
    type: TooManyRequestsError,
  })
  @ApiOperation({
    summary: 'Get Battle.net access token for supplied client credentials',
  })
  getAccessToken(
    @Query() getAccessTokenDto: GetAccessTokenDto
  ): Promise<AccessTokenObject | AccessTokenError> {
    this.logger.setLoggedMethod(this.getAccessToken.name, getAccessTokenDto);
    this.logger.debug();
    return this.accessTokenService.getAccessToken(getAccessTokenDto);
  }
}
