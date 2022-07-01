import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { ApiStatus } from '../../common/types';

export class StatusResponse {
  @ApiProperty({
    description: 'Application status',
    example: 'ok',
  })
  @IsString()
  status: ApiStatus.ok;

  @ApiProperty({
    description: 'Application uptime',
    example: '00:01:02.970',
  })
  @IsString()
  uptime: string;

  @ApiProperty({
    description: 'Timestamp of request completion',
    example: '2022-06-24T23:19:59.477Z',
  })
  @IsString()
  timestamp: string;
}
