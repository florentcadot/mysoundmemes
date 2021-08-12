interface Props {
  id?: string
  userId: string
  title: string
  color: string
  avatar?: string
}

export class Board {

  constructor(private props: Props) {}

  get id(): string | undefined {
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

  get avatar(): string | undefined {
    return this.props.avatar
  }

}
