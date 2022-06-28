import { ResponseType } from '../types';

type StatusDefaultResponse = ResponseType<200>;

export const statusDefaultResponse: StatusDefaultResponse = {
  statusCode: 200,
};
