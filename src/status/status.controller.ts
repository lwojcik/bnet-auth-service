import { Controller, Get } from '@nestjs/common';
import { StatusResponse } from '../types';
import { StatusService } from './status.service';

@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Get()
  getStatus(): StatusResponse {
    return this.statusService.getStatus();
  }
}
