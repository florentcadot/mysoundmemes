import { Module, Provider } from '@nestjs/common';
import { Connection } from 'typeorm';
import {
  soundRepositoryToken,
  createSoundToken,
  deleteSoundToken,
  getSoundListToken,
  updateSoundToken,
} from './sound.token';
import { SoundController } from '../../../adapter/primary/controller/sound.controller';
import { CreateSound } from '../../../core/use-case/sound/create-sound.use-case';
import { RealSoundRepository } from '../../../adapter/secondary/repository/sound/real.sound.repository';
import { DeleteSound } from '../../../core/use-case/sound/delete-sound.use-case';
import { GetSoundList } from '../../../core/use-case/sound/get-sound-list.use-case';
import { UpdateSound } from '../../../core/use-case/sound/update-sound.use-case';
import { FileModule } from '../../service/file/file.module';
import { fileToken } from '../../service/file/file.token';

const repositoryProvider: Provider[] = [
  {
    provide   : soundRepositoryToken,
    useFactory: connection => connection.getCustomRepository(RealSoundRepository),
    inject    : [Connection]
  },
];

const useCaseProviders: Provider[] = [
  {
    provide   : createSoundToken,
    useFactory: (soundRepository, fileService) => new CreateSound(soundRepository, fileService),
    inject    : [soundRepositoryToken, fileToken]
  },
  {
    provide   : getSoundListToken,
    useFactory: (soundRepository, fileService) => new GetSoundList(soundRepository, fileService),
    inject    : [soundRepositoryToken, fileToken]
  },
  {
    provide   : updateSoundToken,
    useFactory: (soundRepository) => new UpdateSound(soundRepository),
    inject    : [soundRepositoryToken]
  },
  {
    provide   : deleteSoundToken,
    useFactory: (soundRepository, fileService) => new DeleteSound(soundRepository, fileService),
    inject    : [soundRepositoryToken, fileToken]
  },
];

@Module({
  controllers: [SoundController],
  imports:[FileModule],
  providers: [
    ...repositoryProvider,
    ...useCaseProviders
  ],
  exports:[soundRepositoryToken]
})
export class SoundModule {
}
