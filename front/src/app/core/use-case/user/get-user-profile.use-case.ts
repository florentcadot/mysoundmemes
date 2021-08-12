import { UserRepository } from 'src/app/core/port/repository/user.repository.port'
import { inject, injectable } from 'inversify'
import { GetUserProfileForm } from 'src/app/core/domain/user/get-user-profile-form'
import { User } from 'src/app/core/domain/user/user'

export type GetUserProfileUseCase = {
  execute(props: GetUserProfileForm): Promise<User>
}

@injectable()
export class GetUserProfile implements GetUserProfileUseCase {
  constructor (
    @inject('UserRepository')
    private userRepository: UserRepository,
  ) {}

  async execute (props: GetUserProfileForm): Promise<User> {
    try {
      return await this.userRepository.getUserProfile(props)
    } catch (e) {
      throw e
    }
  }
}
