import { UserRepository } from '../../../../core/port/repository/user.repository.port';
import { EntityRepository, Repository } from 'typeorm';
import { UserTypeorm } from '../../typeorm/user.typeorm';
import { User } from '../../../../core/domain/user';
import { UserMapper } from '../../../mapper/user.mapper';

@EntityRepository(UserTypeorm)
export class RealUserRepository extends Repository<UserTypeorm> implements UserRepository {
    constructor() {
      super()
    }
    async createUser(user: User): Promise<void> {
        await this.save(UserMapper.toOrmEntity(user))
    }

    async getUser(props: { email?: string, id?: string }): Promise<User | null> {

      let user
      if(props.email){
        user = await this.findOne({ email: props.email })
      } else if(props.id){
        user = await this.findOne(props.id)
      }

      if(user){
        return  UserMapper.toDomainEntity(user)
      } else {
        return null
      }
    }

    async updateUser(props: Partial<User>): Promise<User>{

      const ormUser = await this.findOne(props.id)
      const user = UserMapper.toDomainEntity(ormUser)
      const userUpdated = new User({
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        password: user.password,
        role: user.role,
        status: user.status,
        avatarFile: user.avatarFile,
        ...props
      })
      const ormUserUpdated = await this.save(UserMapper.toOrmEntity(userUpdated))
      return UserMapper.toDomainEntity(ormUserUpdated)
    }


  async deleteAll(){
    await this.clear()
  }

}
