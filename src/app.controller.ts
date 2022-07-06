import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResponse } from './common/types';
import { MainResponse } from './main/dto/main-response.dto';
import { MainService } from './main/main.service';
import { UseCommonErrorResponses } from './common/decorators/common-error-responses.decorator';

@ApiTags('main')
@Controller()
export class AppController {
  constructor(private readonly mainService: MainService) {}

  @Get()
  @ApiOperation({ summary: 'App name and list of available endpoints' })
  @ApiOkResponse({
    description: ApiResponse.ok,
    type: MainResponse,
  })
  @UseCommonErrorResponses()
  getMain() {
    return this.mainService.getMain();
  }
}
