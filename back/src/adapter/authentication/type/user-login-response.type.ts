import { UserRole } from '../../../core/domain/user';

export type  UserLoginResponse = {
  accessToken: string
  id: string
  firstname: string
  lastname: string
  email: string,
  role: UserRole,
  avatar?: string
}
