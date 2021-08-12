import { Board } from 'src/app/core/domain/board/board';
import { BoardRepository } from 'src/app/core/port/repository/board.repository.port';
import { inject, injectable } from 'inversify';

export interface GetBoardListUseCase {
  execute(): Promise<Board[]>
}

@injectable()
export class GetBoardList implements GetBoardListUseCase {

  constructor(
    @inject('BoardRepository')
    private boardRepository: BoardRepository,
    ) {}

  async execute(): Promise<Board[]> {
    try {
      return await this.boardRepository.getBoardList()
    } catch (e){
      throw e
    }
  }

}

