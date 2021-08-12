import { UserRole } from 'src/app/core/domain/user/user';

export interface GetUserProfileRequestDto {
  email: string
}

export interface GetUserProfileResponseDto {
  id: string
  firstname: string
  lastname: string
  email: string,
  role: UserRole,
  avatar?: string
}
