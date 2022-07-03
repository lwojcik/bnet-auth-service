import { RequestMethod } from '@nestjs/common';

export interface Endpoints {
  [key: string]: {
    method: RequestMethod;
    url: string;
  };
}
