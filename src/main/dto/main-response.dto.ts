import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean } from 'class-validator';
import { endpointsConfig } from '../../config';
import { APP_INFO } from '../../common/constants';
import { Endpoints } from '../../common/types';

export class MainResponse {
  @ApiProperty({
    description: 'Application name',
    example: APP_INFO.name,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Whether Redis caching is enabled in the application',
    example: true,
  })
  @IsBoolean()
  caching: boolean;

  @ApiProperty({
    description: 'List of available endpoints',
    example: endpointsConfig(),
  })
  endpoints: Endpoints;
}
