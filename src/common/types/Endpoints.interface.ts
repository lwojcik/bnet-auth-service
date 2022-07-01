import { RequestMethod } from '@nestjs/common';

export interface Endpoints {
  [key: string]: {
    name: string;
    method: RequestMethod;
    url: string;
  };
}
