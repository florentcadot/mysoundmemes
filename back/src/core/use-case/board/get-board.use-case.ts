import { Board } from '../../domain/board';
import { BoardRepository } from '../../port/repository/board.repository.port';

interface Props {
  id: string
  userId: string
}

interface GetBoardUseCase {
  execute(props: Props): Promise<Board>
}

export class GetBoard implements GetBoardUseCase {
  constructor(
    private boardRepository: BoardRepository
  ) {}

  public async execute(props: Props): Promise<Board>{
    return await this.boardRepository.getBoardById({ id: props.id, userId: props.userId })
  }

}
