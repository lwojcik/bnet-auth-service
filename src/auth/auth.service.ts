import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { authConfig } from '../config';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(authConfig.KEY)
    private authConf: ConfigType<typeof authConfig>,
    private readonly logger: LoggerService
  ) {
    this.logger.setLoggedClass(AuthService.name);
  }

  validate(username: string) {
    console.log(username);
    this.logger.setLoggedMethod(this.validate.name, username);
    this.logger.debug();

    if (this.authConf.enable) {
      if (username === this.authConf.username) {
        return username;
      }
      return null;
    }
    return 'valid_user';
  }
}
