import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../../core/port/repository/user.repository.port';
import { PasswordHashingService } from '../../core/port/service/password-hashing.service.port';
import { userRepositoryToken } from '../../di/use-case/user/user.token';
import { passwordHashingToken } from '../../di/service/password-hashing/password-hashing.token';
import { UserLoginResponse } from './type/user-login-response.type';
import { UserLoginRequest } from './type/user-login-request.type';
import { UserLoginPayload } from './type/user-login-payload.type';
import { User, UserStatus } from '../../core/domain/user';


@Injectable()
export class Authentication {

  constructor(
    @Inject(userRepositoryToken)
    private userRepository: UserRepository,
    @Inject(passwordHashingToken)
    private passwordHashingService: PasswordHashingService,
    private readonly jwtService: JwtService
  ) {}

  public async validateUser(username: string, password: string): Promise<UserLoginPayload> {
    const user =  await this.userRepository.getUser({ email: username })
    if(user.status === UserStatus.active){
      const passwordCheck = await this.passwordHashingService.check(password,user.password)
      if(passwordCheck){
        return {
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          role: user.role,
          avatar: user.avatarFile?.url
        }
      } else {
        throw new Error('Wrong credentials, please retry')
      }
    } else throw new Error('User should activate his account')
  }

  public login(props: UserLoginRequest): UserLoginResponse {
    return {
      accessToken: this.jwtService.sign(props.user),
      id: props.user.id,
      firstname: props.user.firstname,
      lastname: props.user.lastname,
      email: props.user.email,
      role: props.user.role,
      avatar: props.user.avatar
    }
  }

  public async getUser(props: {email: string}): Promise<User> {
    return this.userRepository.getUser({ email: props.email })
  }
}
