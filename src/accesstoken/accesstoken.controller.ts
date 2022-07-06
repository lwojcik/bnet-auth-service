import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RefreshQueryParam } from '../common/decorators/refresh-query-param.decorator';
import { UseCommonErrorResponses } from '../common/decorators/common-error-responses.decorator';
import { AccessTokenService } from './accesstoken.service';
import { AccessTokenError } from './dto/access-token-error.dto';
import { AccessTokenObject } from './dto/access-token-object.dto';

@ApiTags('accesstoken')
@Controller('accesstoken')
export class AccessTokenController {
  constructor(private readonly accessTokenService: AccessTokenService) {}

  @Get()
  @ApiOperation({
    summary: 'Get Battle.net access token for supplied client credentials',
  })
  @ApiOkResponse({
    description:
      'Successful response. Note that in case of Battle.net errors the application will still return status code 200 and AccessTokenError response.',
    type: AccessTokenObject,
  })
  @ApiOkResponse({
    description: 'Battle.net API error.',
    type: AccessTokenError,
  })
  @UseCommonErrorResponses()
  @RefreshQueryParam()
  getAccessToken(
    @Query('refresh') refresh?: boolean
  ): Promise<AccessTokenObject | AccessTokenError> {
    return this.accessTokenService.getAccessToken(refresh);
  }
}
