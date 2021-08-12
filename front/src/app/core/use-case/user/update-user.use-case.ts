import { UserRepository } from 'src/app/core/port/repository/user.repository.port';
import { inject, injectable } from 'inversify';
import { NotifierService } from 'src/app/core/port/service/notifier.service.port';
import { NotifierType } from 'src/app/core/domain/notifier-type';
import { UpdateUserForm } from 'src/app/core/domain/user/update-user-form';
import { User } from 'src/app/core/domain/user/user';

export interface UpdateUserUseCase {
  execute(props: UpdateUserForm): Promise<User>
}

@injectable()
export class UpdateUser implements UpdateUserUseCase {

  constructor(
    @inject('UserRepository')
    private userRepository: UserRepository,
    @inject('NotifierService')
    private notifierService: NotifierService,
  ) {}

  async execute(props: UpdateUserForm): Promise<User> {
    try {
      const user = await this.userRepository.updateUser(props)
      this.notifierService.open({message: 'User updated', type: NotifierType.positive})
      return user
    } catch(e){
      throw e
    }
  }

}
