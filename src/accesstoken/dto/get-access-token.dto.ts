import { ApiProperty } from '@nestjs/swagger';

export class GetAccessTokenDto {
  @ApiProperty({
    description:
      'When true, Redis store will not be used for access token retrieval. Instead, new access token will be retrieved from Battle.net API and saved in Redis store.',
    default: false,
    required: false,
  })
  refresh?: boolean;
}
