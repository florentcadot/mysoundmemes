import { BoardRepository } from 'src/app/core/port/repository/board.repository.port';
import { inject, injectable } from 'inversify';

export interface DeleteBoardUseCase {
  execute(id: string): Promise<void>
}

@injectable()
export class DeleteBoard implements DeleteBoardUseCase {

  constructor(
    @inject('BoardRepository')
    private boardRepository: BoardRepository,
    ) {}

  async execute(id: string): Promise<void> {
    try {
      await this.boardRepository.deleteBoard(id)
    } catch (e){
      throw e
    }
  }

}

