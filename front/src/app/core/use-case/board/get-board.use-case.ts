import { Board } from 'src/app/core/domain/board/board';
import { BoardRepository } from 'src/app/core/port/repository/board.repository.port';
import { inject, injectable } from 'inversify';

export interface GetBoardUseCase {
  execute(id: string): Promise<Board>
}

@injectable()
export class GetBoard implements GetBoardUseCase {

  constructor(
    @inject('BoardRepository')
    private boardRepository: BoardRepository,
    ) {}

  async execute(id: string): Promise<Board> {
    try {
      return await this.boardRepository.getBoard(id)
    } catch (e){
      throw e
    }
  }
}

