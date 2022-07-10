import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class MainResponse {
  @ApiProperty({
    description: 'Application name',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'List of available endpoints',
  })
  endpoints: {
    method: string;
    url: string;
  };
}
