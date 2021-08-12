import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Authentication } from '../authentication';
import { LOGIN_PASSWORD_FIELD, LOGIN_USERNAME_FIELD } from '../../../../config/auth.config';
import { UserLoginPayload } from '../type/user-login-payload.type';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

  constructor(private authService: Authentication) {
    super({
      usernameField: LOGIN_USERNAME_FIELD,
      passwordField: LOGIN_PASSWORD_FIELD,
    })
  }

  public async validate(username: string, password: string): Promise<UserLoginPayload> {
    try {
      return await this.authService.validateUser(username, password)
    } catch(e){
      throw new HttpException(e.message, HttpStatus.CONFLICT)
    }
  }

}
