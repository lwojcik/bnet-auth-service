import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean } from 'class-validator';
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
    description: 'Application version',
    example: APP_INFO.version,
  })
  @IsString()
  version: string;

  @ApiProperty({
    description: 'Whether Redis caching is enabled in the application',
    example: true,
  })
  @IsBoolean()
  caching: boolean;

  @ApiProperty({
    description: 'List of available endpoints',
    example: {
      status: '/status',
      accesstoken: '/accesstoken',
    },
  })
  @IsString({ each: true })
  endpoints: Endpoints;
}
