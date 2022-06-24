import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class AccessTokenError {
  @ApiProperty({
    description: 'Did error occured?',
  })
  @IsBoolean()
  error: boolean;

  @ApiProperty({
    description: 'Error code',
    example: 401,
  })
  @IsNumber()
  statusCode: number;

  @ApiProperty({
    description: 'Error message',
    example: 'Request failed with status code 401',
  })
  @IsString()
  message: string;

  @ApiProperty({
    description: 'Request id saved in error logs (UUID v4)',
    example: '6bc-043d-4d58-b28b-72a6605dcf78',
  })
  @IsString()
  id: string;
}
