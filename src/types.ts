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

export interface AccessTokenError {
  error: boolean;
  statusCode: number;
  message: string;
  accessToken: never;
}

export type AccessTokenObject = {
  accessToken: string;
};

export type AccessTokenResponse = AccessTokenError | AccessTokenObject;
