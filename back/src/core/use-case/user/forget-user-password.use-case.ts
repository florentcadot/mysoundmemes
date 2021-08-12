import { UserRepository } from '../../port/repository/user.repository.port';
import { PasswordHashingService } from '../../port/service/password-hashing.service.port';
import { TokenService } from '../../port/service/token.service.port';
import { EmailService } from '../../port/service/email.service.port';

interface Props {
  email: string
}

interface ForgetUserPasswordUseCase {
  execute(props: Props): Promise<void>
}

export class ForgetUserPassword implements ForgetUserPasswordUseCase {
  constructor(
    private userRepository: UserRepository,
    private passwordHashingService: PasswordHashingService,
    private tokenService: TokenService,
    private emailService: EmailService,
  ) {}

  public async execute(props: Props){

    const user = await this.userRepository.getUser({ email: props.email })
    if(user){
      const resetUserPasswordToken = this.tokenService.signToken({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email
      }, '10m')

      await this.emailService.sendResetUserPasswordEmail({email: user.email, resetUserPasswordToken})
    }
  }

}
