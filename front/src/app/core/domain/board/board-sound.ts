
export interface SoundFile {
  key: string
  url?: string
}

interface Props {
  id?: string
  boardId: string
  userId: string
  title: string
  file: string
}

export class BoardSound {

  constructor(private props: Props) {}

  get id(): string | undefined {
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

  get file(): string {
    return this.props.file
  }

}
