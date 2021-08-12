import { inject, injectable } from 'inversify'
import { LocalUserRepository } from 'src/app/core/port/repository/local-user.repository.port'

export type LogoutUserUseCase = {
  execute(): void
}

@injectable()
export class LogoutUser implements LogoutUserUseCase {
  constructor (
    @inject('LocalUserRepository')
    private localUserRepository: LocalUserRepository,
  ) {}

  execute () {
    this.localUserRepository.remove()
  }
}
