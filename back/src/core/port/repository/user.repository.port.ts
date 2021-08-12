import { User } from '../../domain/user';

export interface UserRepository {
  createUser(user: User) : Promise<void>
  getUser(props: { email?: string, id?: string }) : Promise<User | null>
  updateUser(props: Partial<User>): Promise<User>
  deleteAll() : Promise<void>
}
