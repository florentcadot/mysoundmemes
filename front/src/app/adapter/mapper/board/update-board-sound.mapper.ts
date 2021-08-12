import { UpdateBoardSoundViewModel }
  from 'src/app/adapter/primary/views/view-model/board/update-board-sound.view-model'
import { UpdateBoardSoundForm } from 'src/app/core/domain/board/update-board-sound.form'
import {
  UpdateBoardSoundRequestDto,
  UpdateBoardSoundResponseDto,
} from 'src/app/adapter/secondary/dto/board/update-board-sound.dto'
import { BoardSound } from 'src/app/core/domain/board/board-sound'

export class UpdateBoardSoundMapper {
  public static toDomainRequest = (props: UpdateBoardSoundViewModel): UpdateBoardSoundForm => ({
    id: props.id,
    boardId: props.boardId,
    title: props.title,
  })

  public static toRepository = (props: UpdateBoardSoundForm): UpdateBoardSoundRequestDto => ({
    id: props.id,
    boardId: props.boardId,
    title: props.title,
  })

  public static toDomainResponse = (props: UpdateBoardSoundResponseDto): BoardSound => (
    new BoardSound({
      id: props.id,
      boardId: props.boardId,
      userId: props.userId,
      title: props.title,
      file: props.file,
    }))
}
