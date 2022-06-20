export type StatusResponse = {
  status: 'ok';
  uptime: string;
  timestamp: string;
};

export interface Endpoints {
  [key: string]: string;
}

export type MainResponse = {
  name: string;
  endpoints: Endpoints;
};
