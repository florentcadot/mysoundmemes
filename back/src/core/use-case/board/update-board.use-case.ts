import { BoardRepository } from '../../port/repository/board.repository.port';
import { Board } from '../../domain/board';
import { FileService } from '../../port/service/file.service.port';

interface Props {
  userId: string
  id: string
  title?: string
  color?: string
  avatarFile?: Express.Multer.File
}

interface UpdateBoardUseCase {
  execute(props: Props): Promise<Board>
}

export class UpdateBoard implements UpdateBoardUseCase {
  constructor(
    private boardRepository: BoardRepository,
    private fileService: FileService
  ) {}

  public async execute(props: Props){

    const currentBoard = await this.boardRepository.getBoardById({id: props.id, userId: props.userId})

    return await this.boardRepository.updateBoard({
      id: props.id,
      userId: props.userId,
      title: props.title ? props.title : currentBoard.title,
      color: props.color ? props.color : currentBoard.color,
      avatarFile: props.avatarFile ?
        await this.fileService.uploadPublicFile({ dataBuffer: props.avatarFile.buffer, dataMimetype: props.avatarFile.mimetype }) : currentBoard.avatarFile
    })
  }

}
