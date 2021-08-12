import { EntityFile } from './entity-file';

interface Props {
  id?: string
  firstname: string
  lastname: string
  email: string
  password?: string
  role: UserRole
  status: UserStatus
  avatarFile?: EntityFile
}

export type UserRole = 'user' | 'admin'

export enum UserStatus {
  pending= 'pending' ,
  active= 'active'
}

export class User {

constructor(private props: Props) {}

  get id(): string {
    return this.props.id
  }

  get firstname(): string {
    return this.props.firstname
  }

  get lastname(): string {
    return this.props.lastname
  }

  get email(): string {
    return this.props.email
  }

  get password(): string {
    return this.props.password
  }

  get role(): UserRole {
    return this.props.role
  }

  get status(): UserStatus {
    return this.props.status
  }

  get avatarFile(): EntityFile {
    return this.props.avatarFile
  }

  set avatarFileUrl(fileUrl: string) {
    this.props.avatarFile = {
      ...this.props.avatarFile,
      url: fileUrl
    }
  }

}
