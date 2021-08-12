import { Board } from 'src/app/core/domain/board/board'
import { GetBoardListResponseDto } from 'src/app/adapter/secondary/dto/board/get-board-list.dto'
export class GetBoardListMapper {
  public static toDomainResponse = (props: GetBoardListResponseDto[]): Board[] => (
    props.map((board) => new Board({
      id: board.id,
      userId: board.userId,
      title: board.title,
      color: board.color,
      avatar: board.avatar,
    })))
}
