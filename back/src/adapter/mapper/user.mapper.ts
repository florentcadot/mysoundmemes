import { GetUserProfileResponseDto } from '../primary/dto/user/get-user.dto';
import { User } from '../../core/domain/user';
import { UserTypeorm } from '../secondary/typeorm/user.typeorm';
import { ObjectID } from 'mongodb';
import { UpdateUserResponseDto } from '../primary/dto/user/update-user.dto';

export class UserMapper {

  public static toOrmEntity(domainUser: User): UserTypeorm {
      const ormUser: UserTypeorm = new UserTypeorm()
      if(domainUser.id){
        ormUser.id        =  new ObjectID(domainUser.id)
      }
      ormUser.firstname = domainUser.firstname
      ormUser.lastname  = domainUser.lastname
      ormUser.email     = domainUser.email
      ormUser.password  = domainUser.password
      ormUser.role      = domainUser.role
      ormUser.status = domainUser.status
      ormUser.avatarFile = domainUser.avatarFile
      return ormUser
  }

  public static toDomainEntity(ormUser: UserTypeorm): User {
    return new User({
      id: ormUser.id.toString(),
      firstname: ormUser.firstname,
      lastname: ormUser.lastname,
      email: ormUser.email,
      password: ormUser.password,
      role: ormUser.role,
      status: ormUser.status,
      avatarFile: ormUser.avatarFile
    })
  }


  public static toGetUserProfileResponseDto = (user: User): GetUserProfileResponseDto => ({
    id: user.id,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    role: user.role,
    avatar: user.avatarFile?.url
  })

  public static toUpdateUserResponseDto = (user: User): UpdateUserResponseDto => ({
    id: user.id,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    role: user.role,
    avatar: user.avatarFile?.url
  })

}
