import { LoginUserForm } from 'src/app/core/domain/user/login-user-form'
import { UserRepository } from 'src/app/core/port/repository/user.repository.port'
import { inject, injectable } from 'inversify'
import { LocalUserRepository } from 'src/app/core/port/repository/local-user.repository.port'
import { LoginUserMapper } from 'src/app/adapter/mapper/user/login-user.mapper'
import { User } from 'src/app/core/domain/user/user'

export type LoginUserUseCase = {
  execute(props: LoginUserForm): Promise<User>
}

@injectable()
export class LoginUser implements LoginUserUseCase {
  constructor (
    @inject('UserRepository')
    private userRepository: UserRepository,
    @inject('LocalUserRepository')
    private localUserRepository: LocalUserRepository,
  ) {}

  async execute (props: LoginUserForm): Promise<User> {
    try {
      const response = await this.userRepository.login(props)
      this.localUserRepository.set(LoginUserMapper.toLocalUser(response))
      this.localUserRepository.setReloadFlag(false)
      return LoginUserMapper.toUser(response)
    } catch (e) {
      throw e
    }
  }
}
