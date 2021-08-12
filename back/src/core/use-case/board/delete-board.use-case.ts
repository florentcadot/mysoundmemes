import { BoardRepository } from '../../port/repository/board.repository.port';
import { FileService } from '../../port/service/file.service.port';
import { SoundRepository } from '../../port/repository/sound.repository.port';

interface Props {
  id: string
  userId: string
}

interface DeleteBoardUseCase {
  execute(props: Props): Promise<string>
}

export class DeleteBoard implements DeleteBoardUseCase {
  constructor(
    private boardRepository: BoardRepository,
    private soundRepository: SoundRepository,
    private fileService: FileService
  ) {}

  public async execute(props: Props){
    const board = await this.boardRepository.getBoardById({id: props.id, userId: props.userId})
    if(board.avatarFile){
      await this.fileService.deletePublicFile(board.avatarFile.key)
    }
    const soundList = await this.soundRepository.getSoundList({userId: props.userId, boardId: props.id})

    soundList.forEach(async (sound) => {
      await this.soundRepository.deleteSound({ id: sound.id, userId: sound.userId })
      await this.fileService.deletePrivateFile(sound.file.key)
    })

    return await this.boardRepository.deleteBoard({ id: props.id, userId: props.userId })
  }

}
