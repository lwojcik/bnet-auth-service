import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class TooManyRequestsError {
  @ApiProperty({
    description: 'Error status code',
    example: HttpStatus.TOO_MANY_REQUESTS,
  })
  statusCode: number;

  @ApiProperty({
    description: 'Error message',
    example: 'ThrottlerException: Too Many Requests',
  })
  message: string;
}
