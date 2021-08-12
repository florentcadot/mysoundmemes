import { Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { LocalGuard } from '../../authentication/passport-guard/local-guard';
import { Authentication } from '../../authentication/authentication';
import { UserLoginResponse } from '../../authentication/type/user-login-response.type';
import { UserLoginRequest } from '../../authentication/type/user-login-request.type';

@Controller('/api/auth')
export class AuthenticationController {

  constructor(private readonly authService: Authentication) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalGuard)
  public async handleLogin(@Req() request: UserLoginRequest): Promise<UserLoginResponse> {
    return this.authService.login(request)
  }

}
