import { Injectable } from '@nestjs/common';
import { formatTime } from '../utils/formatTime';
import { StatusResponse } from '../types';

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
