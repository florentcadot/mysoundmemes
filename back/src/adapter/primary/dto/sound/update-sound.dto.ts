import { IsOptional, IsString } from 'class-validator';


export class UpdateSoundDto {

  @IsString()
  id: string

  @IsOptional()
  @IsString()
  boardId: string

  @IsOptional()
  @IsString()
  title: string

}

export interface UpdateSoundResponseDto{
  id: string
  boardId: string
  userId: string
  title: string
  file: string
}
