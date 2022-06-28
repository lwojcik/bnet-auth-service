import { ResponseType } from '../types';

type PlaceholderResponse = ResponseType<
  200,
  {
    foo: 'bar';
  }
>;

export const placeholderResponse: PlaceholderResponse = {
  statusCode: 200,
  data: {
    foo: 'bar',
  },
};
