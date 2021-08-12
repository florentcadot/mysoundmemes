import { Board } from 'src/app/core/domain/board/board'
import { BoardRepository } from 'src/app/core/port/repository/board.repository.port'
import { inject, injectable } from 'inversify'
import { UpdateBoardForm } from 'src/app/core/domain/board/update-board-form'

export type UpdateBoardUseCase = {
  execute(props: UpdateBoardForm): Promise<Board>
}

@injectable()
export class UpdateBoard implements UpdateBoardUseCase {
  constructor (
    @inject('BoardRepository')
    private boardRepository: BoardRepository,
  ) {}

  async execute (props: UpdateBoardForm): Promise<Board> {
    try {
      return await this.boardRepository.updateBoard(props)
    } catch (e) {
      throw e
    }
  }
}
