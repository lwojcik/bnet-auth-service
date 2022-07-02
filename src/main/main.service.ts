import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { APP_INFO } from '../common/constants';
import { endpointsConfig, redisConfig } from '../config';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class MainService {
  constructor(
    private readonly logger: LoggerService,
    @Inject(endpointsConfig.KEY)
    private readonly endpoints: ConfigType<typeof endpointsConfig>,
    @Inject(redisConfig.KEY)
    private readonly redisConf: ConfigType<typeof redisConfig>
  ) {
    this.logger.setLoggedClass(MainService.name);
  }

  getMain() {
    this.logger.setLoggedMethod(this.getMain.name);
    this.logger.debug();

    return {
      name: APP_INFO.name,
      endpoints: this.endpoints,
    };
  }
}
