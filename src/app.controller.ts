import { Controller, Get } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { AppService } from './app.service';
import { MainResponse } from './types';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly logger: PinoLogger
  ) {}

  @Get()
  getMain(): MainResponse {
    this.logger.debug('AppController.getMain()');
    return this.appService.getMain();
  }
}
