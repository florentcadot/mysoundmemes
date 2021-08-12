import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Authentication } from '../authentication';
import { UserLoginPayload } from '../type/user-login-payload.type';
import { User } from '../../../core/domain/user';
import {ConfigService} from '@nestjs/config'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(private configService: ConfigService, private authService: Authentication) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader(configService.get<string>('ACCESS_TOKEN_HEADER')),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('ACCESS_TOKEN_SECRET'),
    });
  }

  public async validate(payload: UserLoginPayload): Promise<User> {
    const user = await this.authService.getUser({email: payload.email})
    return user
  }

}
