import { SoundRepository } from '../../port/repository/sound.repository.port';
import { FileService } from '../../port/service/file.service.port';

interface Props {
  id: string
  userId: string
}

interface DeleteSoundUseCase {
  execute(props: Props): Promise<string>
}

export class DeleteSound implements DeleteSoundUseCase {
  constructor(
    private soundRepository: SoundRepository,
    private fileService: FileService
    ) {}

  public async execute(props: Props){
    const sound = await this.soundRepository.getSoundById({id: props.id, userId: props.userId})
    await this.fileService.deletePrivateFile(sound.file.key)
    return await this.soundRepository.deleteSound({ id: props.id, userId: props.userId })
  }

}
