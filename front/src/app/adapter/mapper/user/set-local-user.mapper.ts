import { SetLocalUserForm } from 'src/app/core/domain/user/set-local-user-form';
import { SetLocalUserDto } from 'src/app/adapter/secondary/dto/user/set-local-user.dto';

export class SetLocalUserMapper {

  public static toRepository = (props: SetLocalUserForm): SetLocalUserDto => (
    { id: props.id,
      accessToken: props.accessToken,
      email: props.email
    })
}
