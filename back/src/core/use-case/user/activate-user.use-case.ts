import { UserRepository } from '../../port/repository/user.repository.port';
import { TokenService } from '../../port/service/token.service.port';
import { ActivateUserPayload } from '../../domain/activate-user-payload';
import { User, UserStatus } from '../../domain/user';

interface Props {
  activationToken: string
}

interface ActivateUserUseCase {
  execute(props: Props): Promise<void>
}

export class ActivateUser implements ActivateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private tokenService: TokenService
  ) {}

  public async execute(props: Props){

    const activateUserPayload = await this.tokenService.verifyToken<ActivateUserPayload>(props.activationToken)
    const user: User = await this.userRepository.getUser({ email: activateUserPayload.email })

    await this.userRepository.updateUser({
      id: user.id,
      status: UserStatus.active
    })

  }


}
