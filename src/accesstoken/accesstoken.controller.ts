import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoggerService } from '../logger/logger.service';
import { AccessTokenService } from './accesstoken.service';
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
  @ApiOperation({
    summary: 'Get Battle.net access token for supplied client credentials',
  })
  getAccessToken(@Query() getAccessTokenDto: GetAccessTokenDto) {
    this.logger.setLoggedMethod(this.getAccessToken.name, getAccessTokenDto);
    this.logger.debug();
    return this.accessTokenService.getAccessToken(getAccessTokenDto);
  }
}
