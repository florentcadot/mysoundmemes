import { Module } from '@nestjs/common';
import { cleaningToken } from './cleaning.token';
import { RealCleaningService } from '../../../adapter/secondary/service/cleaning/real.cleaning.service';
import { userRepositoryToken } from '../../use-case/user/user.token';
import { boardRepositoryToken } from '../../use-case/board/board.token';
import { soundRepositoryToken } from '../../use-case/sound/sound.token';
import { fileToken } from '../file/file.token';
import { UserModule } from '../../use-case/user/user.module';
import { BoardModule } from '../../use-case/board/board.module';
import { SoundModule } from '../../use-case/sound/sound.module';
import { FileModule } from '../file/file.module';

@Module({
  imports:[UserModule, BoardModule, SoundModule, FileModule ],
  providers: [
    {
      provide   : cleaningToken,
      useFactory: (userRepository, boardRepository, soundRepository, fileService) => new RealCleaningService(userRepository, boardRepository, soundRepository, fileService),
      inject:[userRepositoryToken, boardRepositoryToken, soundRepositoryToken, fileToken]
    },
  ],
  exports:[cleaningToken]
})
export class CleaningModule {
}
