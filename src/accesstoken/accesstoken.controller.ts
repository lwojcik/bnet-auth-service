import { Controller, Get, Query } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { AccessTokenService } from './accesstoken.service';
import { GetAccessTokenDto } from './dto/get-access-token.dto';

@Controller('accesstoken')
export class AccessTokenController {
  constructor(
    private readonly accessTokenService: AccessTokenService,
    @InjectPinoLogger(AccessTokenController.name)
    private readonly logger: PinoLogger
  ) {}

  @Get()
  getAccessToken(@Query() getAccessTokenDto: GetAccessTokenDto) {
    this.logger.debug(
      `AccessTokenController.getAccessToken(${JSON.stringify(
        getAccessTokenDto
      )})`
    );
    return this.accessTokenService.getAccessToken(getAccessTokenDto);
  }
}
