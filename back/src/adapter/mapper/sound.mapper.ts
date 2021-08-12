import { Sound } from '../../core/domain/sound';
import { SoundTypeorm } from '../secondary/typeorm/sound.typeorm';
import { ObjectID } from 'mongodb';
import { CreateSoundResponseDto } from '../primary/dto/sound/create-sound.dto';
import { GetSoundListResponseDto } from '../primary/dto/sound/get-sound-list.dto';
import { UpdateSoundResponseDto } from '../primary/dto/sound/update-sound.dto';

export class SoundMapper {

  public static toOrmEntity(domainSound: Sound): SoundTypeorm {
    const ormSound: SoundTypeorm = new SoundTypeorm()
    if(domainSound.id){
      ormSound.id        =  new ObjectID(domainSound.id)
    }
    ormSound.boardId = domainSound.boardId
    ormSound.userId = domainSound.userId
    ormSound.title  = domainSound.title
    ormSound.file = domainSound.file
    return ormSound
  }

  public static toDomainEntity(ormSound: SoundTypeorm): Sound {
    return new Sound({
      id: ormSound.id.toString(),
      boardId: ormSound.boardId,
      userId: ormSound.userId,
      title: ormSound.title,
      file: ormSound.file
    })
  }


  public static toCreateSoundResponseDto = (sound: Sound): CreateSoundResponseDto => ({
    id: sound.id,
    boardId: sound.boardId,
    userId: sound.userId,
    title: sound.title,
    file: sound.file.url
  })

  public static toGetSoundListResponseDto = (soundList: Sound[]): GetSoundListResponseDto => {
    return soundList.map(sound => ({
      id: sound.id,
      boardId: sound.boardId,
      userId: sound.userId,
      title: sound.title,
      file: sound.file,
    }))
  }

  public static toUpdateSoundResponseDto = (board: Sound): UpdateSoundResponseDto => ({
    id: board.id,
    boardId: board.boardId,
    userId: board.userId,
    title: board.title,
    file: board.file.url
  })

}
