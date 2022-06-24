import { ApiProperty } from '@nestjs/swagger';

export class GetAccessTokenDto {
  @ApiProperty({
    description:
      'When true, Redis store will not be used for access token retrieval. Instead, Access token will be retrieved from Battle.net API and re-cached in Redis store',
    default: false,
    required: false,
  })
  refresh?: boolean;
}
