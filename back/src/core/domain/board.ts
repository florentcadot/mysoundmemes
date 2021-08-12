import { EntityFile } from './entity-file';

interface Props {
  id?: string
  userId: string
  title: string
  color: string
  avatarFile?: EntityFile
}

export class Board {

  constructor(private props: Props) {}

  get id(): string {
    return this.props.id
  }

  get userId(): string {
    return this.props.userId
  }

  get title(): string {
    return this.props.title
  }

  get color(): string {
    return this.props.color
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
