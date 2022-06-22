import { Controller, Get, Query } from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';
import { AccessTokenService } from './accesstoken.service';
import { GetAccessTokenDto } from './dto/get-access-token.dto';

@Controller('accesstoken')
export class AccessTokenController {
  constructor(
    private readonly accessTokenService: AccessTokenService,
    private readonly logger: LoggerService
  ) {
    this.logger.setLoggedClass(AccessTokenController.name);
  }

  @Get()
  getAccessToken(@Query() getAccessTokenDto: GetAccessTokenDto) {
    this.logger.setLoggedMethod(this.getAccessToken.name, getAccessTokenDto);
    this.logger.debug();
    return this.accessTokenService.getAccessToken(getAccessTokenDto);
  }
}
