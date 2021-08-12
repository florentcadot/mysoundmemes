import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { EntityFileTypeorm } from './entity-file.typeorm';

@Entity('sound')
export class SoundTypeorm {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  boardId: string

  @Column()
  userId: string

  @Column()
  title: string

  @Column(type => EntityFileTypeorm)
  file: EntityFileTypeorm
}
