import { UserRole } from 'src/app/core/domain/user/user'

export type UpdateUserRequestDto = {
  firstname?: string
  lastname?: string
  email?: string,
  password?: {
    old?: string
    new?: string
  }
  file?: null | File
}

export type UpdateUserResponseDto = {
  id: string
  firstname: string
  lastname: string
  email: string,
  role: UserRole,
  avatar?: string
}
