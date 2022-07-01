import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class UnauthorizedError {
  @ApiProperty({
    description: 'Error status code',
    example: HttpStatus.UNAUTHORIZED,
  })
  statusCode: number;

  @ApiProperty({
    description: 'Error message',
    example: 'Unauthorized',
  })
  message: string;
}
