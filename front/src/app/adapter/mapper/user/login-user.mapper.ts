import { LoginUserViewModel } from 'src/app/adapter/primary/views/view-model/user/login-user.view-model';
import { LoginUserForm } from 'src/app/core/domain/user/login-user-form';
import { LoginUserRequestDto, LoginUserResponseDto } from 'src/app/adapter/secondary/dto/user/login-user.dto';
import { LoginUserResponse } from 'src/app/core/domain/user/login-user-response';
import { SetLocalUserForm } from 'src/app/core/domain/user/set-local-user-form';
import { User } from 'src/app/core/domain/user/user';

export class LoginUserMapper {

  public static toDomainRequest = (props: LoginUserViewModel): LoginUserForm => ({
    email: props.email,
    password: props.password
  })

  public static toRepository = (props: LoginUserForm): LoginUserRequestDto => ({
    username: props.email,
    password: props.password
  })

  public static toDomainResponse = (props: LoginUserResponseDto): LoginUserResponse => ({
    accessToken: props.accessToken,
    id: props.id,
    firstname: props.firstname,
    lastname: props.lastname,
    email: props.email,
    role: props.role,
    avatar: props.avatar
  })

  public static toLocalUser = (props: LoginUserResponse): SetLocalUserForm => (new SetLocalUserForm({
    accessToken: props.accessToken,
    id: props.id,
    email: props.email
  }))

  public static toUser = (props: LoginUserResponse): User => (new User({
    id: props.id,
    firstname: props.firstname,
    lastname: props.lastname,
    email: props.email,
    role: props.role,
    avatar: props.avatar
  }))

}
