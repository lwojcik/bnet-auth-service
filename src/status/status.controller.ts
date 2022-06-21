import { Controller, Get } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { StatusResponse } from '../types';
import { StatusService } from './status.service';

@Controller('status')
export class StatusController {
  constructor(
    private readonly statusService: StatusService,
    @InjectPinoLogger(StatusController.name) private readonly logger: PinoLogger
  ) {}

  @Get()
  getStatus(): StatusResponse {
    this.logger.debug('StatusController.getStatus()');
    return this.statusService.getStatus();
  }
}
