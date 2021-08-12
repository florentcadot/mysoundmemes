import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Authentication } from '../authentication';
import { ACCESS_TOKEN_HEADER, ACCESS_TOKEN_SECRET } from '../../../../config/auth.config';
import { UserLoginPayload } from '../type/user-login-payload.type';
import { User } from '../../../core/domain/user';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(private authService: Authentication) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader(ACCESS_TOKEN_HEADER),
      ignoreExpiration: false,
      secretOrKey: ACCESS_TOKEN_SECRET,
    });
  }

  public async validate(payload: UserLoginPayload): Promise<User> {
    const user = await this.authService.getUser({email: payload.email})
    return user
  }

}
