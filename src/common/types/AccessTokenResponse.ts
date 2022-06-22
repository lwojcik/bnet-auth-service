import { AccessTokenObject } from './AccessTokenObject';
import { AccessTokenError } from './AccessTokenError';

export type AccessTokenResponse = AccessTokenError | AccessTokenObject;
