import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { endpointsConfig } from './config';
import { LoggerService } from './logger/logger.service';
import { MainResponse } from './common/types';
import { APP_INFO } from './common/constants';

@Injectable()
export class AppService {
  constructor(
    private readonly logger: LoggerService,
    @Inject(endpointsConfig.KEY)
    private endpoints: ConfigType<typeof endpointsConfig>
  ) {
    this.logger.setLoggedClass(AppService.name);
  }

  getMain(): MainResponse {
    this.logger.setLoggedMethod(this.getMain.name);
    this.logger.debug();

    return {
      name: APP_INFO.name,
      version: APP_INFO.version,
      endpoints: this.endpoints,
    };
  }
}
