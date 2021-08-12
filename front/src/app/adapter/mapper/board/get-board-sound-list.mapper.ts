import { BoardSound } from 'src/app/core/domain/board/board-sound'
import {
  GetBoardSoundListRequestDto,
  GetBoardSoundListResponseDto,
} from 'src/app/adapter/secondary/dto/board/get-board-sound-list.dto'
import { GetBoardSoundListForm } from 'src/app/core/domain/board/get-board-sound-list-form'

export class GetBoardSoundListMapper {
  public static toDomainResponse = (props: GetBoardSoundListResponseDto[]): BoardSound[] => (
    props.map((boardSound) => new BoardSound({
      id: boardSound.id,
      boardId: boardSound.boardId,
      userId: boardSound.userId,
      title: boardSound.title,
      file: boardSound.file.url,
    })))

  public static toRepository = (props: GetBoardSoundListForm): GetBoardSoundListRequestDto => ({
    boardId: props.boardId,
  })
}
