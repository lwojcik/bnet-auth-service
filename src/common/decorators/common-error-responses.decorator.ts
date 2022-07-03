import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { TooManyRequestsError } from '../dto/too-many-requests-error.dto';
import { UnauthorizedError } from '../dto/unauthorized-error.dto';
import { ApiResponse } from '../types';

export const UseCommonErrorResponses = () =>
  applyDecorators(
    ApiBadRequestResponse({
      description: ApiResponse.badRequest,
    }),
    ApiUnauthorizedResponse({
      description: ApiResponse.unauthorized,
      type: UnauthorizedError,
    }),
    ApiTooManyRequestsResponse({
      description: ApiResponse.tooManyRequests,
      type: TooManyRequestsError,
    })
  );
