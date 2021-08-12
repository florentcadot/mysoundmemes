import { GetLocalUserResponse } from 'src/app/core/domain/user/get-local-user-response'
import { SetLocalUserForm } from 'src/app/core/domain/user/set-local-user-form'

export type LocalUserRepository = {
  get(): GetLocalUserResponse | null
  set(user: SetLocalUserForm): void
  remove(): void
  setReloadFlag(state: boolean): void
  getReloadFlag(): boolean
}
