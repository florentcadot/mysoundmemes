import { Board } from 'src/app/core/domain/board/board';
import { CreateBoardForm } from 'src/app/core/domain/board/create-board-form';
import { BoardRepository } from 'src/app/core/port/repository/board.repository.port';
import { inject, injectable } from 'inversify';

export interface CreateBoardUseCase {
  execute(props: CreateBoardForm): Promise<Board>
}

@injectable()
export class CreateBoard implements CreateBoardUseCase {

  constructor(
    @inject('BoardRepository')
    private boardRepository: BoardRepository,
    ) {}

  async execute(props: CreateBoardForm): Promise<Board> {
    try {
      return await this.boardRepository.createBoard(props)
    } catch (e){
      throw e
    }
  }

}

