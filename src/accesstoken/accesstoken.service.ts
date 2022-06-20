import { Injectable } from '@nestjs/common';
import { GetAccessTokenDto } from './dto/get-access-token.dto';

@Injectable()
export class AccessTokenService {
  getAccessToken(getAccessTokenDto: GetAccessTokenDto) {
    const { refresh } = getAccessTokenDto;
    return `access token goes here, refresh: ${refresh}`;
  }
}
