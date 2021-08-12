import { BaseEntity, Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { UserRole, UserStatus } from '../../../core/domain/user';
import { EntityFileTypeorm } from './entity-file.typeorm';

@Entity('user')
export class UserTypeorm extends BaseEntity {
  @ObjectIdColumn()
  id: ObjectID

  @Column()
  firstname: string

  @Column()
  lastname: string

  @Column()
  email: string

  @Column()
  password: string

  @Column()
  role: UserRole

  @Column()
  status: UserStatus

  @Column(type => EntityFileTypeorm)
  avatarFile: EntityFileTypeorm

}
