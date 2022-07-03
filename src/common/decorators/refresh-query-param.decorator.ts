import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

export const RefreshQueryParam = () =>
  applyDecorators(
    ApiQuery({
      name: 'refresh',
      type: Boolean,
      description:
        'Skip cache check. Instead, fresh data from Battle.net API is fetched and existing cache state is overwritten.',
      required: false,
    })
  );
