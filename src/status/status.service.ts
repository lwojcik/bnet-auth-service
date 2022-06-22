import { Injectable } from '@nestjs/common';
import { formatTime } from '../utils';
import { LoggerService } from '../logger/logger.service';
import { StatusResponse } from '../common/types';

@Injectable()
export class StatusService {
  constructor(private readonly logger: LoggerService) {
    this.logger.setLoggedClass(StatusService.name);
  }

  getStatus(): StatusResponse {
    this.logger.setLoggedMethod(this.getStatus.name);
    this.logger.debug();

    return {
      status: 'ok',
      uptime: formatTime(process.uptime()),
      timestamp: new Date().toISOString(),
    };
  }
}
