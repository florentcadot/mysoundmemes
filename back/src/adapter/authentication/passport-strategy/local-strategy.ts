import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Authentication } from '../authentication';
import { UserLoginPayload } from '../type/user-login-payload.type';
import {ConfigService} from '@nestjs/config'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

  constructor(private config: ConfigService, private authService: Authentication) {
    super({
      usernameField: config.get<string>('LOGIN_USERNAME_FIELD'),
      passwordField: config.get<string>('LOGIN_PASSWORD_FIELD'),
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
