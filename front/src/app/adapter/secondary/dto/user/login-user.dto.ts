import { UserRole } from 'src/app/core/domain/user/user'

export type LoginUserRequestDto = {
  username: string
  password: string
}

export type LoginUserResponseDto = {
  accessToken: string
  id: string
  firstname: string
  lastname: string
  email: string,
  role: UserRole,
  avatar?: string
}
