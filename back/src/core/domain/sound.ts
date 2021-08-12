import { EntityFile } from './entity-file';

interface  Props {
  id?: string
  boardId: string
  userId: string
  title: string
  file: EntityFile
}

export class Sound {

constructor(private props: Props) {}

  get id(): string {
    return this.props.id
  }

  get boardId(): string {
    return this.props.boardId
  }

  get userId(): string {
    return this.props.userId
  }

  get title(): string {
    return this.props.title
  }

  get file(): EntityFile {
    return this.props.file
  }

  set fileUrl(fileUrl: string) {
    this.props.file = {
      ...this.props.file,
      url: fileUrl
    }
  }

}
