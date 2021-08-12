import { UserRepository } from 'src/app/core/port/repository/user.repository.port';
import { inject, injectable } from 'inversify';
import { NotifierService } from 'src/app/core/port/service/notifier.service.port';
import { NotifierType } from 'src/app/core/domain/notifier-type';
import { ForgetPasswordUserForm } from 'src/app/core/domain/user/forget-password-user-form';

export interface ForgetPasswordUserUseCase {
  execute(props: ForgetPasswordUserForm): Promise<void>
}

@injectable()
export class ForgetPasswordUser implements ForgetPasswordUserUseCase {

  constructor(
    @inject('UserRepository')
    private userRepository: UserRepository,
    @inject('NotifierService')
    private notifierService: NotifierService,
  ) {}

  async execute(props: ForgetPasswordUserForm): Promise<void> {
    try {
      await this.userRepository.forgetPasswordUser(props)
      this.notifierService.open({message: 'Check your email to change your password', type: NotifierType.positive})
    } catch (e){
      throw e
    }
  }

}
