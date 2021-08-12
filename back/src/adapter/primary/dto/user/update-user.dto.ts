import { IsOptional, IsString } from 'class-validator';
import { UserRole } from '../../../../core/domain/user';

export class UpdateUserDto {

  @IsOptional()
  @IsString()
  firstname: string

  @IsOptional()
  @IsString()
  lastname: string

  @IsOptional()
  @IsString()
  email: string

  @IsOptional()
  password: {
    old?: string
    new?: string
  }
}


export interface UpdateUserResponseDto {
  id: string
  firstname: string
  lastname: string
  email: string
  role: UserRole
  avatar: string
}
