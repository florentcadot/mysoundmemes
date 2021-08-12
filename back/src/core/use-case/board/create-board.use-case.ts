import { BoardRepository } from '../../port/repository/board.repository.port';
import { Board } from '../../domain/board';
import { FileService } from '../../port/service/file.service.port';


interface Props {
  userId: string
  title: string
  color: string
  avatarFile?: Express.Multer.File
}

interface CreateBoardUseCase {
  execute(props: Props): Promise<Board>
}

export class CreateBoard implements CreateBoardUseCase {
  constructor(
    private boardRepository: BoardRepository,
    private fileService: FileService
  ) {}


  public async execute(props: Props){


    let avatarFile

    if(props.avatarFile){
      avatarFile =  await this.fileService.uploadPublicFile({ dataBuffer: props.avatarFile.buffer, dataMimetype: props.avatarFile.mimetype })
    }

    const board = new Board({
      userId: props.userId,
      title: props.title,
      color: props.color,
      avatarFile
    })
    return await this.boardRepository.createBoard(board)
  }

}
