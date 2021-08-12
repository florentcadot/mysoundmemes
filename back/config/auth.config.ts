import { get } from 'env-var';

export const ACCESS_TOKEN_SECRET = get('ACCESS_TOKEN_SECRET').asString()

export const ACCESS_TOKEN_HEADER = get('ACCESS_TOKEN_HEADER').asString()

export const ACCESS_TOKEN_TTL_IN_MINUTES = get('ACCESS_TOKEN_TTL_IN_MINUTES').asInt()

export const LOGIN_USERNAME_FIELD = get('LOGIN_USERNAME_FIELD').asString()

export const LOGIN_PASSWORD_FIELD = get('LOGIN_PASSWORD_FIELD').asString()

export const JWT_PRIVATE_KEY = get('JWT_PRIVATE_KEY').asString()
