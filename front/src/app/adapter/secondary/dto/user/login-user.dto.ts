import { UserRole } from 'src/app/core/domain/user/user';

export interface LoginUserRequestDto {
  username: string
  password: string
}

export interface LoginUserResponseDto {
  accessToken: string
  id: string
  firstname: string
  lastname: string
  email: string,
  role: UserRole,
  avatar?: string
}
