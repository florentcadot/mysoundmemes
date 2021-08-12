import { UserRole } from '../../../core/domain/user';

export type UserLoginPayload =  {
  id: string
  firstname: string
  lastname: string
  email: string,
  role: UserRole,
  avatar?: string
}
