import { TokenService } from '../../../../core/port/service/token.service.port';
import { sign, verify } from 'jsonwebtoken'
import {ConfigService} from '@nestjs/config'

export class RealTokenService implements TokenService {

  constructor(private config: ConfigService) {}

  signToken<T extends string | object | Buffer>(payload: T, expiresIn: string): string {
    return sign(payload, this.config.get<string>('JWT_PRIVATE_KEY'), {expiresIn})
  }

  verifyToken<T extends string | object>(token: string): T {
    return verify(token, this.config.get<string>('JWT_PRIVATE_KEY')) as T
  }

}
