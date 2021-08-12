import { IsString } from 'class-validator';
import { EntityFile } from '../../../../core/domain/entity-file';


export class CreateBoardDto {

  @IsString()
  title: string

  @IsString()
  color: string

}

export interface CreateBoardResponseDto{
  id: string,
  userId: string,
  title: string,
  color: string,
  avatar: string
}
