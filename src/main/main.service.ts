import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { APP_INFO } from '../common/constants';
import { endpointsConfig } from '../config';

@Injectable()
export class MainService {
  constructor(
    @Inject(endpointsConfig.KEY)
    private readonly endpoints: ConfigType<typeof endpointsConfig>
  ) {}

  getMain() {
    return {
      name: APP_INFO.name,
      endpoints: this.endpoints,
    };
  }
}
