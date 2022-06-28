import { ResponseType } from '../types';

type UnauthorizedResponse = ResponseType<
  401,
  {
    statusCode: 401;
    message: 'Unauthorized';
  }
>;

export const unauthorizedResponse: UnauthorizedResponse = {
  statusCode: 401,
  data: {
    statusCode: 401,
    message: 'Unauthorized',
  },
};
