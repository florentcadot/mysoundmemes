type Props = {
  id: string
  accessToken: string
  email: string
}

export class GetLocalUserResponse {
  constructor (private props: Props) {}

  get id (): string {
    return this.props.id
  }

  get accessToken (): string {
    return this.props.accessToken
  }

  get email (): string {
    return this.props.email
  }
}
