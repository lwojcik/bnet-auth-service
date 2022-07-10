import { Injectable } from '@nestjs/common';
import { formatTime } from '../utils';
import { StatusResponse } from './dto/status-response.dto';

@Injectable()
export class StatusService {
  getStatus(): StatusResponse {
    return {
      status: 'ok',
      uptime: formatTime(process.uptime()),
      timestamp: new Date().toISOString(),
    };
  }
}
