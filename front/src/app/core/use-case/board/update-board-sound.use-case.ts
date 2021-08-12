import { inject, injectable } from 'inversify'
import { UpdateBoardSoundForm } from 'src/app/core/domain/board/update-board-sound.form'
import { BoardSound } from 'src/app/core/domain/board/board-sound'
import { BoardRepository } from 'src/app/core/port/repository/board.repository.port'

export type UpdateBoardSoundUseCase = {
  execute(props: UpdateBoardSoundForm): Promise<BoardSound>
}

@injectable()
export class UpdateBoardSound implements UpdateBoardSoundUseCase {
  constructor (
    @inject('BoardRepository')
    private boardRepository: BoardRepository,
  ) {}

  async execute (props: UpdateBoardSoundForm): Promise<BoardSound> {
    try {
      return await this.boardRepository.updateBoardSound(props)
    } catch (e) {
      throw e
    }
  }
}
