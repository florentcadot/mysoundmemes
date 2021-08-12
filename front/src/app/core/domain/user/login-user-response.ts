import { UserRole } from 'src/app/core/domain/user/user'

export type LoginUserResponse = {
  accessToken: string
  id: string
  firstname: string
  lastname: string
  email: string,
  role: UserRole,
  avatar?: string
}
