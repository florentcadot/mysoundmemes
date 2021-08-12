import { get } from 'env-var';

export const  EMAIL_USER = get('EMAIL_USER').asString()

export const  EMAIL_PASSWORD = get('EMAIL_PASSWORD').asString()
