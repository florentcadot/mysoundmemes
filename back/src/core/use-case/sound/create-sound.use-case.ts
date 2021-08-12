import { Sound } from '../../domain/sound';
import { SoundRepository } from '../../port/repository/sound.repository.port';
import { FileService } from '../../port/service/file.service.port';

interface Props {
  boardId: string,
  userId: string
  title: string
  file: Express.Multer.File
}

interface CreateSoundUseCase {
  execute(props: Props): Promise<Sound>
}

export class CreateSound implements CreateSoundUseCase {
  constructor(
    private boardRepository: SoundRepository,
    private fileServiceService: FileService
    ) {}

  public async execute(props: Props){
    const fileKey = await this.fileServiceService.uploadPrivateFile({dataBuffer: props.file.buffer, dataMimetype: props.file.mimetype} )
    const board = new Sound({
      boardId: props.boardId,
      userId: props.userId,
      title: props.title,
      file: {
        key: fileKey,
      }
    })
    return await this.boardRepository.createSound(board)
  }

}
