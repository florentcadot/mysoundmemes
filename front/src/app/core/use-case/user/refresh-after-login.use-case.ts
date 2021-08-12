import { inject, injectable } from 'inversify'
import { LocalUserRepository } from 'src/app/core/port/repository/local-user.repository.port'

export type RefreshAfterLoginUseCase = {
  execute(): void
}

@injectable()
export class RefreshAfterLogin implements RefreshAfterLoginUseCase {
  constructor (
    @inject('LocalUserRepository')
    private localUserRepository: LocalUserRepository,
  ) {}

  execute (): void {
    const reloadFlag = this.localUserRepository.getReloadFlag()
    if (!reloadFlag) {
      this.localUserRepository.setReloadFlag(true)
      location.reload()
    }
  }
}
