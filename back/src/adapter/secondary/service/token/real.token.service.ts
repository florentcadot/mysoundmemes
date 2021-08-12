import { TokenService } from '../../../../core/port/service/token.service.port';
import { sign, verify } from 'jsonwebtoken'
import { JWT_PRIVATE_KEY } from '../../../../../config/auth.config';

export class RealTokenService implements TokenService {

  signToken<T extends string | object | Buffer>(payload: T, expiresIn: string): string {
    return sign(payload, JWT_PRIVATE_KEY, {expiresIn})
  }

  verifyToken<T extends string | object>(token: string): T {
    return verify(token, JWT_PRIVATE_KEY) as T
  }

}
