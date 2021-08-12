export interface TokenService {
  signToken<T extends string | object | Buffer>(payload: T, expiresIn: string): string
  verifyToken<T extends string | object>(token: string): T
}
