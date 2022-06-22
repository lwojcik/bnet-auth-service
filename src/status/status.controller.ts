import { Controller, Get } from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';
import { StatusResponse } from '../common/types';
import { StatusService } from './status.service';

@Controller('status')
export class StatusController {
  constructor(
    private readonly statusService: StatusService,
    private readonly logger: LoggerService
  ) {
    this.logger.setLoggedClass(StatusController.name);
  }

  @Get()
  getStatus(): StatusResponse {
    this.logger.setLoggedMethod(this.getStatus.name);
    this.logger.debug();
    return this.statusService.getStatus();
  }
}
