import { UserRole } from 'src/app/core/domain/user/user'

export type GetUserProfileRequestDto = {
  email: string
}

export type GetUserProfileResponseDto = {
  id: string
  firstname: string
  lastname: string
  email: string,
  role: UserRole,
  avatar?: string
}
