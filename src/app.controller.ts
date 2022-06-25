import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ApiResponse } from './common/types';
import { MainResponse } from './main/dto/main-response.dto';
import { LoggerService } from './logger/logger.service';
import { MainService } from './main/main.service';
import { TooManyRequestsError } from './common/dto/too-many-requests-error.dto';
import { AUTH } from './common/constants';
import { JwtAuthGuard, PassthroughGuard } from './auth/guards';

@ApiTags('main')
@Controller()
export class AppController {
  constructor(
    private readonly mainService: MainService,
    private readonly logger: LoggerService
  ) {
    this.logger.setLoggedClass(AppController.name);
  }

  @Get()
  @UseGuards(
    process.env[AUTH.enable] === 'true' ? JwtAuthGuard : PassthroughGuard
  )
  @ApiOperation({ summary: 'App name and list of available endpoints' })
  @ApiOkResponse({
    description: ApiResponse.ok,
    type: MainResponse,
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
  getMain() {
    this.logger.setLoggedMethod(this.getMain.name);
    this.logger.debug();
    return this.mainService.getMain();
  }
}
