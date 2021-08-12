import { IsString } from 'class-validator';


export class CreateSoundDto {

  @IsString()
  boardId: string

  @IsString()
  title: string

}

export interface CreateSoundResponseDto{
  id: string
  boardId: string
  userId: string
  title: string
  file: string
}
