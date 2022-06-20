import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { appConfig, endpointsConfig } from './config';
import { MainResponse } from './types';

@Injectable()
export class AppService {
  constructor(
    @InjectPinoLogger(AppService.name) private readonly logger: PinoLogger,
    @Inject(endpointsConfig.KEY)
    private endpoints: ConfigType<typeof endpointsConfig>,
    @Inject(appConfig.KEY)
    private app: ConfigType<typeof appConfig>
  ) {}

  getMain(): MainResponse {
    this.logger.debug('AppService.getMain()');
    return {
      name: this.app.name,
      endpoints: this.endpoints,
    };
  }
}
