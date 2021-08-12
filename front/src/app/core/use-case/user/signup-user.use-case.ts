import { UserRepository } from 'src/app/core/port/repository/user.repository.port';
import { inject, injectable } from 'inversify';
import { SignupUserForm } from 'src/app/core/domain/user/signup-user-form';
import { NotifierService } from 'src/app/core/port/service/notifier.service.port';
import { NotifierType } from 'src/app/core/domain/notifier-type';

export interface SignupUserUseCase {
  execute(props: SignupUserForm): Promise<void>
}

@injectable()
export class SignupUser implements SignupUserUseCase {

  constructor(
    @inject('UserRepository')
    private userRepository: UserRepository,
    @inject('NotifierService')
    private notifierService: NotifierService,
  ) {}

  async execute(props: SignupUserForm): Promise<void> {
    try {
      await this.userRepository.signup(props)
      this.notifierService.open({message: 'Check your email to activate your account', type: NotifierType.positive})
    } catch(e){
      throw e
    }
}

}
