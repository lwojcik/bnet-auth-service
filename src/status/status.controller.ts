import { Controller, Get } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoggerService } from '../logger/logger.service';
import { ApiResponse } from '../common/types';
import { StatusResponse } from './dto/status-response.dto';
import { StatusService } from './status.service';
import { TooManyRequestsError } from '../common/dto/too-many-requests-error.dto';

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
  @ApiOkResponse({
    description: ApiResponse.ok,
    type: StatusResponse,
  })
  @ApiBadRequestResponse({
    description: ApiResponse.badRequest,
  })
  @ApiUnauthorizedResponse({
    description: ApiResponse.unauthorized,
  })
  @ApiTooManyRequestsResponse({
    description: ApiResponse.tooManyRequests,
    type: TooManyRequestsError,
  })
  getStatus() {
    this.logger.setLoggedMethod(this.getStatus.name);
    this.logger.debug();
    return this.statusService.getStatus();
  }
}
