import { BaseEntity, Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { EntityFileTypeorm } from './entity-file.typeorm';

@Entity('board')
export class BoardTypeorm extends BaseEntity {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  userId: string;

  @Column()
  title: string;

  @Column()
  color: string;

  @Column(type => EntityFileTypeorm)
  avatarFile: EntityFileTypeorm
}
