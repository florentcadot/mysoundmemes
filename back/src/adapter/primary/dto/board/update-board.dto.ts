import { IsOptional, IsString } from 'class-validator';
import { EntityFile } from '../../../../core/domain/entity-file';


export class UpdateBoardDto {

  @IsString()
  id: string

  @IsOptional()
  @IsString()
  title: string

  @IsOptional()
  @IsString()
  color: string

}

export interface UpdateBoardResponseDto {
  id: string,
  userId: string,
  title: string,
  color: string,
  avatar: string
}
