import { Board } from 'src/app/core/domain/board/board'
import {
  UpdateBoardRequestDto,
  UpdateBoardResponseDto,
} from 'src/app/adapter/secondary/dto/board/update-board.dto'
import { UpdateBoardForm } from 'src/app/core/domain/board/update-board-form'
import { UpdateBoardViewModel }
  from 'src/app/adapter/primary/views/view-model/board/update-board.view-model'
import { SharedMapper } from 'src/app/adapter/mapper/shared/shared.mapper'

export class UpdateBoardMapper {
  public static toDomainRequest = (props: UpdateBoardViewModel): UpdateBoardForm => ({
    id: props.id,
    title: props.title,
    color: props.color,
    file: props.avatar ? props.avatar : undefined,
  })

  public static toRepository = (props: UpdateBoardForm): FormData => {
    const updateBoardRequest: UpdateBoardRequestDto = {
      id: props.id,
      title: props.title,
      color: props.color,
      file: props.file,
    }

    return SharedMapper.toFormData(updateBoardRequest)
  }

  public static toDomainResponse = (props: UpdateBoardResponseDto): Board => (new Board({
    id: props.id,
    userId: props.userId,
    title: props.title,
    color: props.color,
    avatar: props.avatar,
  }))
}
