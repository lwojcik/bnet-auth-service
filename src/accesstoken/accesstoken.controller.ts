import { Controller, Get, Query } from '@nestjs/common';
import { AccessTokenService } from './accesstoken.service';
import { GetAccessTokenDto } from './dto/get-access-token.dto';

@Controller('accesstoken')
export class AccessTokenController {
  constructor(private readonly accessTokenService: AccessTokenService) {}

  @Get()
  getAccessToken(@Query() getAccessTokenDto: GetAccessTokenDto) {
    return this.accessTokenService.getAccessToken(getAccessTokenDto);
  }
}
