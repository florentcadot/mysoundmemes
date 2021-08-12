import { Board } from 'src/app/core/domain/board/board'
import { GetBoardResponseDto } from 'src/app/adapter/secondary/dto/board/get-board.dto'

export class GetBoardMapper {
  public static toDomainResponse = (props: GetBoardResponseDto): Board => (
    new Board({
      id: props.id,
      userId: props.userId,
      title: props.title,
      color: props.color,
      avatar: props.avatar,
    }))
}
