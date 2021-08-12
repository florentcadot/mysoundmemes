import { EntityRepository, Repository } from 'typeorm';
import { ObjectID } from 'mongodb'
import { SoundTypeorm } from '../../typeorm/sound.typeorm';
import { SoundRepository } from '../../../../core/port/repository/sound.repository.port';
import { Sound } from '../../../../core/domain/sound';
import { SoundMapper } from '../../../mapper/sound.mapper';

@EntityRepository(SoundTypeorm)
export class RealSoundRepository extends Repository<SoundTypeorm> implements SoundRepository {
  constructor() {
    super()
  }
  async createSound(sound: Sound): Promise<Sound> {
    const soundSaved = await this.save(SoundMapper.toOrmEntity(sound))
    return SoundMapper.toDomainEntity(soundSaved)
  }

  async getSoundList(props: { userId: string, boardId: string }): Promise<Sound[]> {
    const soundList = await this.find({ userId: props.userId, boardId: props.boardId })
    return soundList.map(sound => SoundMapper.toDomainEntity(sound))
  }

  async getSoundById(props: { id: string, userId: string}): Promise<Sound> {
    const ormSound = await this.findOne( props.id,{ where: { userId: props.userId }} )
    return SoundMapper.toDomainEntity(ormSound)
  }

  async  updateSound(props: Partial<Sound>): Promise<Sound> {
    const ormSound = await this.findOne(props.id, { where: { userId: props.userId }})
    const sound = SoundMapper.toDomainEntity(ormSound)
    const soundUpdated = new Sound({
      id: sound.id,
      boardId: sound.boardId,
      userId: sound.userId,
      title: sound.title,
      file: sound.file,
      ...props
    })

    const ormSoundUpdated = await this.save(SoundMapper.toOrmEntity(soundUpdated))
    return SoundMapper.toDomainEntity(ormSoundUpdated)
  }


  async deleteSound(props: { id: string, userId: string }): Promise<string> {
    const ormSound =  await this.findOne(props.id, {where: { userId: props.userId }})
    await this.delete(new ObjectID(props.id))
    return 'OK'
  }

  async deleteAll(){
    await this.clear()
  }

}
