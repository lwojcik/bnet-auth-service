import { Injectable } from '@nestjs/common';
import { StatusResponse } from '../types';

@Injectable()
export class StatusService {
  getStatus(): StatusResponse {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
}
