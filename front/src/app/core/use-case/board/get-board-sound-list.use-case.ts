import { BoardRepository } from 'src/app/core/port/repository/board.repository.port'
import { inject, injectable } from 'inversify'
import { BoardSound } from 'src/app/core/domain/board/board-sound'
import { GetBoardSoundListForm } from 'src/app/core/domain/board/get-board-sound-list-form'

export type GetBoardSoundListUseCase = {
  execute(props: GetBoardSoundListForm): Promise<BoardSound[]>
}

@injectable()
export class GetBoardSoundList implements GetBoardSoundListUseCase {
  constructor (
    @inject('BoardRepository')
    private boardRepository: BoardRepository,
  ) {}

  async execute (props: GetBoardSoundListForm): Promise<BoardSound[]> {
    try {
      return await this.boardRepository.getBoardSoundList(props)
    } catch (e) {
      throw e
    }
  }
}
