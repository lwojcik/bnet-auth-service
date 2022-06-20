import { Injectable } from '@nestjs/common';

@Injectable()
export class StatusService {
  getStatus() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
}
