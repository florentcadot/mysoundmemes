import { User, UserStatus } from '../../../../core/domain/user';
import { UserRepository } from '../../../../core/port/repository/user.repository.port';
import { UserTypeorm } from '../../typeorm/user.typeorm';
import { UserMapper } from '../../../mapper/user.mapper';
import { ObjectID } from 'mongodb';

export class InMemoryUserRepository implements UserRepository {

  public userList: UserTypeorm[]


  constructor() {
    const ormUser = new UserTypeorm()
    ormUser.id = new ObjectID('55153a8014829a865bbf7001')
    ormUser.firstname = 'seraphin'
    ormUser.lastname = 'andrieux'
    ormUser.email = 'seraphin@gmail.com'
    ormUser.role = 'user'
    ormUser.status = UserStatus.active
    this.userList = [ormUser]
  }


  async createUser(props: User): Promise<void> {
    const user = new User({
      id: '55153a8014829a865bbf7002',
      firstname: props.firstname,
      lastname: props.lastname,
      email: props.email,
      role: props.role,
      status: props.status
    })
    this.userList.push(UserMapper.toOrmEntity(user))
  }

  async getUser(props: { email?: string; id?: string }): Promise<User | null> {
    const ormUser = this.userList.find(ormUser => ormUser.email === props.email)
    return Promise.resolve(ormUser ? UserMapper.toDomainEntity(ormUser) : null)
  }

  async updateUser(props: Partial<User>): Promise<User> {
    const ormUserIndex = this.userList.findIndex(ormUser => ormUser.id.toString() === props.id)
    const ormUser = this.userList[ormUserIndex]
    const user = UserMapper.toDomainEntity(ormUser)
    const userUpdated = new User({
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
      role: user.role,
      status: user.status,
      ...props
    })
    this.userList[ormUserIndex] = UserMapper.toOrmEntity(userUpdated)
    return userUpdated
  }

  async deleteAll(){
    this.userList = []
  }


}
