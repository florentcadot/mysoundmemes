import { UserRepository } from 'src/app/core/port/repository/user.repository.port';
import { inject, injectable } from 'inversify';
import { ActivateUserForm } from 'src/app/core/domain/user/activate-user-form';
import { NotifierService } from 'src/app/core/port/service/notifier.service.port';
import { NotifierType } from 'src/app/core/domain/notifier-type';

export interface ActivateUserUseCase {
  execute(props: ActivateUserForm): Promise<void>
}

@injectable()
export class ActivateUser implements ActivateUserUseCase {

  constructor(
    @inject('UserRepository')
    private userRepository: UserRepository,
    @inject('NotifierService')
    private notifierService: NotifierService,
  ) {}

  async execute(props: ActivateUserForm): Promise<void> {
    try {
      await this.userRepository.activateUser(props)
      this.notifierService.open({message: 'Account activated', type: NotifierType.positive})
    } catch (e){
      throw e
    }
  }

}
