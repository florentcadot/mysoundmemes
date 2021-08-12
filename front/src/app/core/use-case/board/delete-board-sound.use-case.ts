import { BoardRepository } from 'src/app/core/port/repository/board.repository.port';
import { inject, injectable } from 'inversify';

export interface DeleteBoardSoundUseCase {
  execute(id: string): Promise<void>
}

@injectable()
export class DeleteBoardSound implements DeleteBoardSoundUseCase {

  constructor(
    @inject('BoardRepository')
    private boardRepository: BoardRepository,
    ) {}

  async execute(id: string): Promise<void> {
    try {
      await this.boardRepository.deleteBoardSound(id)
    } catch (e){
      throw e
    }}

}

