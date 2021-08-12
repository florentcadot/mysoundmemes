import { SoundRepository } from '../../../../core/port/repository/sound.repository.port';
import { ObjectID } from 'mongodb';
import { SoundTypeorm } from '../../typeorm/sound.typeorm';
import { Sound } from '../../../../core/domain/sound';
import { SoundMapper } from '../../../mapper/sound.mapper';

export class InMemorySoundRepository implements SoundRepository {

  public soundList: SoundTypeorm[]

  constructor() {
    const ormSound = new SoundTypeorm()
    ormSound.id =  ObjectID('1')
    ormSound.boardId =  '1'
    ormSound.userId = '1'
    ormSound.title  = 'Sound 1'
    ormSound.file = {
      key: '12324'
    }

    const ormSound2 = new SoundTypeorm()
    ormSound2.id =  ObjectID('2')
    ormSound2.userId = '2'
    ormSound2.title  = 'Sound 2'
    ormSound.file = {
      key: '123224234'
    }
    this.soundList= [ormSound, ormSound2]
  }

  async createSound(props: Sound): Promise<Sound> {
    this.soundList.push(SoundMapper.toOrmEntity(props))
    return props
  }

  async getSoundById(props: { id: string; userId: string }): Promise<Sound> {
    const ormSound = this.soundList.find(ormSound => ormSound.id.toString() === props.id && ormSound.userId === props.userId)
    return SoundMapper.toDomainEntity(ormSound)
  }

  async getSoundList(props: { userId: string, boardId: string }): Promise<Sound[]> {
    return this.soundList.map(ormSound => SoundMapper.toDomainEntity(ormSound))
  }

  async updateSound(props: Partial<Sound>): Promise<Sound> {
    const ormSoundIndex = this.soundList.findIndex(ormSound => ormSound.id.toString() === props.id)
    const ormSound = this.soundList[ormSoundIndex]
    const sound = SoundMapper.toDomainEntity(ormSound)
    const soundUpdated = new Sound({
      id: sound.id,
      boardId: sound.boardId,
      userId: sound.userId,
      title: sound.title,
      file: sound.file,
      ...props
    })
    this.soundList[ormSoundIndex] = SoundMapper.toOrmEntity(soundUpdated)
    return soundUpdated
  }

  async deleteSound(props: { id: string; userId: string }): Promise<string> {
    const soundIndex = this.soundList.findIndex((ormSound) => ormSound.id.toString() === props.id && ormSound.userId === props.userId )
    this.soundList.splice(soundIndex, 1)
    return 'OK'
  }

  async deleteAll(){
    this.soundList = []
  }

}
