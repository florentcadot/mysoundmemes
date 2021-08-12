import { UserRepository } from '../../../../core/port/repository/user.repository.port';
import { BoardRepository } from '../../../../core/port/repository/board.repository.port';
import { SoundRepository } from '../../../../core/port/repository/sound.repository.port';
import { FileService } from '../../../../core/port/service/file.service.port';
import { CleaningService } from '../../../../core/port/service/cleaning.service.port';
import { Cron } from '@nestjs/schedule';

export class RealCleaningService implements CleaningService{

  constructor(private userRepository: UserRepository, private boardRepository: BoardRepository, private soundRepository: SoundRepository, private fileService: FileService) {}

  @Cron('0 30 11 * * 1-7')
  async clean(): Promise<void> {

    const privateFiles = await this.fileService.getPrivateFileList()
    privateFiles.map(async (file) => {
      await this.fileService.deletePrivateFile(file.key)
    })

    const publicFiles = await this.fileService.getPublicFileList()
    publicFiles.map(async (file) => {
      await this.fileService.deletePublicFile(file.key)
    })

    await this.userRepository.deleteAll()
    await this.boardRepository.deleteAll()
    await this.soundRepository.deleteAll()
  }
}
