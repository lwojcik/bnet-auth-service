import { Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { formatTime } from '../utils/formatTime';
import { StatusResponse } from '../types';

@Injectable()
export class StatusService {
  constructor(
    @InjectPinoLogger(StatusService.name) private readonly logger: PinoLogger
  ) {}

  getStatus(): StatusResponse {
    this.logger.debug('StatusService.getStatus()');
    return {
      status: 'ok',
      uptime: formatTime(process.uptime()),
      timestamp: new Date().toISOString(),
    };
  }
}
