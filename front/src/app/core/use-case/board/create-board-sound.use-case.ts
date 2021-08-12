import { inject, injectable } from 'inversify';
import { CreateBoardSoundForm } from 'src/app/core/domain/board/create-board-sound-form';
import { BoardSound } from 'src/app/core/domain/board/board-sound';
import { BoardRepository } from 'src/app/core/port/repository/board.repository.port';

export interface CreateBoardSoundUseCase {
  execute(props: CreateBoardSoundForm): Promise<BoardSound>
}

@injectable()
export class CreateBoardSound implements CreateBoardSoundUseCase {

  constructor(
    @inject('BoardRepository')
    private boardRepository: BoardRepository,
    ) {}

  async execute(props: CreateBoardSoundForm): Promise<BoardSound> {
    try {
      return await this.boardRepository.createBoardSound(props)
    } catch (e){
      throw e
    }
  }

}

