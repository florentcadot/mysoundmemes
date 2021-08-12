import { Sound } from '../../domain/sound';
import { SoundRepository } from '../../port/repository/sound.repository.port';
import { FileService } from '../../port/service/file.service.port';
import { PrivateFileUrl } from '../../domain/private-file-url';

interface Props {
  userId: string
  boardId: string
}

interface GetSoundListUseCase {
  execute(props: Props): Promise<Sound[]>
}

export class GetSoundList implements GetSoundListUseCase {
  constructor(
    private soundRepository: SoundRepository,
    private fileService: FileService
  ) {}

  public async execute(props: Props){

    const soundList = await this.soundRepository.getSoundList({ userId: props.userId, boardId: props.boardId })
    const soundFileKeyList = soundList.map(sound => (sound.file.key))

    const fileUrlList: PrivateFileUrl[] = await this.fileService.getPrivateFilesUrl(soundFileKeyList)
    const filesUrl = fileUrlList.reduce((obj, fileUrl) => (obj[fileUrl.key] = fileUrl.url, obj) ,{});

    const soundListWithUrl = soundList.map(sound =>{
      sound.fileUrl = filesUrl[sound.file.key]
      return sound
    })
    return soundListWithUrl
  }

}
