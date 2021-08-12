import { UserRepository } from '../../port/repository/user.repository.port';
import { User } from '../../domain/user';

interface Props {
  email?: string
  id?: string
}

interface GetUserUseCase {
  execute(props: Props): Promise<User>
}

export class GetUser implements GetUserUseCase {
  constructor(
    private userRepository: UserRepository
  ) {}

  public async execute(props: Props){
    return await this.userRepository.getUser(props)
  }

}
