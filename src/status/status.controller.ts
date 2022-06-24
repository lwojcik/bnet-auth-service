import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoggerService } from '../logger/logger.service';
import { StatusResponse } from '../common/types';
import { StatusService } from './status.service';

@ApiTags('status')
@Controller('status')
export class StatusController {
  constructor(
    private readonly statusService: StatusService,
    private readonly logger: LoggerService
  ) {
    this.logger.setLoggedClass(StatusController.name);
  }

  @Get()
  @ApiOperation({ summary: 'Check app health and uptime' })
  getStatus(): StatusResponse {
    this.logger.setLoggedMethod(this.getStatus.name);
    this.logger.debug();
    return this.statusService.getStatus();
  }
}
