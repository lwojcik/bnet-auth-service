import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean } from 'class-validator';
import { Endpoints } from '../../common/types';

export class MainResponse {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  version: string;

  @ApiProperty()
  @IsBoolean()
  caching: boolean;

  @ApiProperty()
  @IsString({ each: true })
  endpoints: Endpoints;
}
