import { Sound } from '../../domain/sound';

export interface SoundRepository {
  createSound(props: Sound): Promise<Sound>
  getSoundList(props: { userId: string, boardId: string }): Promise<Sound[]>
  getSoundById(props: { id: string, userId: string }): Promise<Sound>
  updateSound(props: Partial<Sound>): Promise<Sound>
  deleteSound(props: { id: string, userId: string }): Promise<string>
  deleteAll() : Promise<void>
}
