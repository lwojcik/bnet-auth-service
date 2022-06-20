import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  getMain() {
    return {
      name: 'bnet-auth-service',
      endpoints: this.configService.get('endpoints'),
    };
  }
}
