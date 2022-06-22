import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { appConfig, endpointsConfig } from './config';
import { LoggerService } from './logger/logger.service';
import { MainResponse } from './common/types';

@Injectable()
export class AppService {
  constructor(
    private readonly logger: LoggerService,
    @Inject(endpointsConfig.KEY)
    private endpoints: ConfigType<typeof endpointsConfig>,
    @Inject(appConfig.KEY)
    private app: ConfigType<typeof appConfig>
  ) {
    this.logger.setLoggedClass(AppService.name);
  }

  getMain(): MainResponse {
    this.logger.setLoggedMethod(this.getMain.name);
    this.logger.debug();

    return {
      name: this.app.name,
      endpoints: this.endpoints,
    };
  }
}
