import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { REDIS } from '../../common/constants';

export class GetAccessTokenDto {
  @ApiProperty({
    description: `When 'true' is passed, Redis store will not be used for access token retrieval. Instead, new access token will be retrieved from Battle.net API and saved into Redis store. Note that this option will not take effect if Redis caching is disabled by ${REDIS.enable} environment variable.`,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  refresh?: boolean;
}
