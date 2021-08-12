import { IsString } from 'class-validator';

export class ForgetUserPasswordDto {
  @IsString()
  email: string
}
