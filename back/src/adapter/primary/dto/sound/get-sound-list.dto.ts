import { IsString } from 'class-validator';
import { EntityFile } from '../../../../core/domain/entity-file';

export class GetSoundListDto {

  @IsString()
  boardId: string

}

interface GetSoundListItem {
  id: string
  boardId: string
  userId: string
  title: string
  file: EntityFile
}

export type GetSoundListResponseDto = GetSoundListItem[]
