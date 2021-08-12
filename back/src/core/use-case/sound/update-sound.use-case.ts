import { SoundRepository } from '../../port/repository/sound.repository.port';
import { Sound } from '../../domain/sound';

interface Props {
  userId: string
  id: string
  boardId?: string
  title?: string
}

interface UpdateSoundUseCase {
  execute(props: Props): Promise<Sound>
}

export class UpdateSound implements UpdateSoundUseCase {
  constructor(
    private soundRepository: SoundRepository) {}

  public async execute(props: Props){
    const currentSound = await this.soundRepository.getSoundById({id: props.id, userId: props.userId})
    return await this.soundRepository.updateSound({
      userId: props.userId,
      id: props.id,
      boardId: props.boardId ? props.boardId : currentSound.boardId ,
      title: props.title ? props.title : currentSound.title
    })
  }

}
