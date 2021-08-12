interface Props {
  id?: string
  firstname: string
  lastname: string
  email: string
  password?: string
  role: UserRole
  avatar?: string
}

export type UserRole = 'user' | 'admin'

export class User {

  constructor(private props: Props) {}

  get id(): string | undefined {
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

  get password(): string | undefined {
    return this.props.password
  }

  get role(): UserRole {
    return this.props.role
  }

  get avatar(): string | undefined {
    return this.props.avatar
  }

}
