import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Source } from '../../common/types';

export class AccessTokenObject {
  @ApiProperty({
    description: 'Access token retrieved from Battle.net',
    example: 'USBiUBW34n43mOQM3anfLivSl3a84PGNIo',
  })
  @IsString()
  accessToken: string;

  @ApiProperty({
    enum: Source,
    example: Source.cache,
    description: 'Where the access token was retrieved from',
  })
  source: Source;
}
