import { inject, injectable } from 'inversify';
import { LocalUserRepository } from 'src/app/core/port/repository/local-user.repository.port';
import { GetLocalUserResponse } from 'src/app/core/domain/user/get-local-user-response';

export interface GetLocalUserUseCase {
  execute(): GetLocalUserResponse | null
}

@injectable()
export class GetLocalUser implements GetLocalUserUseCase {

  constructor(
    @inject('LocalUserRepository')
    private localUserRepository: LocalUserRepository
  ) {}

  execute(): GetLocalUserResponse | null {
      return this.localUserRepository.get()
  }

}
