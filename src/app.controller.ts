import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MainResponse } from './common/types';
import { LoggerService } from './logger/logger.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly logger: LoggerService
  ) {
    this.logger.setLoggedClass(AppController.name);
  }

  @Get()
  getMain(): MainResponse {
    this.logger.setLoggedMethod(this.getMain.name);
    this.logger.debug();
    return this.appService.getMain();
  }
}
