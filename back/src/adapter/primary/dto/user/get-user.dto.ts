import { IsOptional, IsString } from 'class-validator';

export class GetUserDto {

  @IsOptional()
  @IsString()
  id: string

  @IsOptional()
  @IsString()
  email: string

}

export interface GetUserProfileResponseDto {
  id: string
  firstname: string
  lastname: string
  email: string
  role: string
  avatar: string
}
