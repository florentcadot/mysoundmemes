import { get } from 'env-var';

export const AWS_PRIVATE_BUCKET_NAME: string = get('AWS_PRIVATE_BUCKET_NAME').asString()

export const AWS_REGION = get('AWS_REGION').asString()

export const AWS_ACCESS_KEY_ID = get('AWS_ACCESS_KEY_ID').asString()

export  const AWS_SECRET_ACCESS_KEY= get('AWS_SECRET_ACCESS_KEY').asString()

export const AWS_PUBLIC_BUCKET_NAME = get('AWS_PUBLIC_BUCKET_NAME').asString()
