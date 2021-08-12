import { UserRepository } from 'src/app/core/port/repository/user.repository.port';
import { inject, injectable } from 'inversify';
import { NotifierService } from 'src/app/core/port/service/notifier.service.port';
import { NotifierType } from 'src/app/core/domain/notifier-type';
import { ResetUserPasswordForm } from 'src/app/core/domain/user/reset-user-password-form';

export interface ResetUserPasswordUseCase {
  execute(props: ResetUserPasswordForm): Promise<void>
}

@injectable()
export class ResetUserPassword implements ResetUserPasswordUseCase {

  constructor(
    @inject('UserRepository')
    private userRepository: UserRepository,
    @inject('NotifierService')
    private notifierService: NotifierService,
  ) {}

  async execute(props: ResetUserPasswordForm): Promise<void> {
    try {
      await this.userRepository.resetUserPassword(props)
      this.notifierService.open({message: 'Password changed', type: NotifierType.positive})
    } catch(e){
      throw e
    }
  }

}
