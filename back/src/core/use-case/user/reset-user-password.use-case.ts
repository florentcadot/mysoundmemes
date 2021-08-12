import { UserRepository } from '../../port/repository/user.repository.port';
import { TokenService } from '../../port/service/token.service.port';
import { User } from '../../domain/user';
import { ResetUserPasswordPayload } from '../../domain/reset-user-password-payload';
import { PasswordHashingService } from '../../port/service/password-hashing.service.port';

interface Props {
  password: string
  resetUserPasswordToken: string
}

interface ResetUserPasswordUseCase {
  execute(props: Props): Promise<void>
}

export class ResetUserPassword implements ResetUserPasswordUseCase {
  constructor(
    private userRepository: UserRepository,
    private tokenService: TokenService,
    private passwordHashingService: PasswordHashingService
  ) {}

  public async execute(props: Props){
    const resetUserPasswordPayload = await this.tokenService.verifyToken<ResetUserPasswordPayload>(props.resetUserPasswordToken)
    const user: User = await this.userRepository.getUser({ email: resetUserPasswordPayload.email })
    await this.userRepository.updateUser({
      id: user.id,
      password: await this.passwordHashingService.hash(props.password)
    })
  }

}
