import { Board } from '../../domain/board';
import { BoardRepository } from '../../port/repository/board.repository.port';

interface Props {
  userId: string
}

interface GetBoardListUseCase {
  execute(props: Props): Promise<Board[]>
}

export class GetBoardList implements GetBoardListUseCase {
  constructor(
    private boardRepository: BoardRepository
  ) {}

  public async execute(props: Props){
    return await this.boardRepository.getBoardList(props.userId)
  }

}
