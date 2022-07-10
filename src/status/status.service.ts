import { Injectable } from '@nestjs/common';
import { Duration } from 'luxon';
import { StatusResponse } from './dto/status-response.dto';

@Injectable()
export class StatusService {
  getStatus(): StatusResponse {
    const uptimeSeconds = Math.floor(process.uptime());
    const uptimeMinutes = Math.floor(uptimeSeconds / 60);
    const uptimeHours = Math.floor(uptimeMinutes / 60);
    const uptimeDays = Math.floor(uptimeHours / 24);

    return {
      status: 'ok',
      uptime: Duration.fromObject({
        days: uptimeDays,
        hours: uptimeHours,
        minutes: uptimeMinutes,
      }).toHuman({
        unitDisplay: 'narrow',
      }),
      timestamp: new Date().toISOString(),
    };
  }
}
