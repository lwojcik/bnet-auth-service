import { Injectable } from '@nestjs/common';
import { formatTime } from '../utils';
import { LoggerService } from '../logger/logger.service';
import { ApiStatus } from '../common/types';
import { StatusResponse } from './dto/status-response.dto';

@Injectable()
export class StatusService {
  constructor(private readonly logger: LoggerService) {
    this.logger.setLoggedClass(StatusService.name);
  }

  getStatus(): StatusResponse {
    this.logger.setLoggedMethod(this.getStatus.name);
    this.logger.debug();

    return {
      status: ApiStatus.ok,
      uptime: formatTime(process.uptime()),
      timestamp: new Date().toISOString(),
    };
  }
}
