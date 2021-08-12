import { BoardSound } from 'src/app/core/domain/board/board-sound'
import { CreateBoardSoundViewModel }
  from 'src/app/adapter/primary/views/view-model/board/create-board-sound.view-model'
import { CreateBoardSoundForm } from 'src/app/core/domain/board/create-board-sound-form'
import { SharedMapper } from 'src/app/adapter/mapper/shared/shared.mapper'
import {
  CreateBoardSoundRequestDto,
  CreateBoardSoundResponseDto,
} from 'src/app/adapter/secondary/dto/board/create-board-sound.dto'

export class CreateBoardSoundMapper {
  public static toDomainRequest = (props: CreateBoardSoundViewModel): CreateBoardSoundForm => ({
    boardId: props.boardId,
    title: props.title,
    file: props.file,
  })

  public static toRepository = (props: CreateBoardSoundForm): FormData => {
    const createBoardSoundRequest: CreateBoardSoundRequestDto = {
      boardId: props.boardId,
      title: props.title,
      file: props.file ? props.file : undefined,
    }
    return SharedMapper.toFormData(createBoardSoundRequest)
  }

  public static toDomainResponse = (props: CreateBoardSoundResponseDto): BoardSound => (
    new BoardSound({
      id: props.id,
      boardId: props.boardId,
      userId: props.userId,
      title: props.title,
      file: props.file,
    }))
}
