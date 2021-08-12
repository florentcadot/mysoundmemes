import { Request } from 'express';
import { UserLoginPayload } from './user-login-payload.type';

export type UserLoginRequest = Request & { user: UserLoginPayload}
