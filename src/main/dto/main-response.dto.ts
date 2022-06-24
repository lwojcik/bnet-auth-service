import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean } from 'class-validator';
import { Endpoints } from '../../common/types';

export class MainResponse {
  @ApiProperty({
    description: 'Application name',
    example: 'bnet-auth-service',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Application version',
    example: '2.0.0',
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
