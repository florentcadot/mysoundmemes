import { ResetUserPasswordViewModel } from 'src/app/adapter/primary/views/view-model/user/reset-user-password.view-model';
import { ResetUserPasswordForm } from 'src/app/core/domain/user/reset-user-password-form';
import { ResetUserPasswordRequestDto } from 'src/app/adapter/secondary/dto/user/reset-user-password.dto';

export class ResetUserPasswordMapper {

  public static toDomainRequest = (props: ResetUserPasswordViewModel): ResetUserPasswordForm => ({
    password: props.password,
    token: props.token
  })

  public static toRepository = (props: ResetUserPasswordForm): ResetUserPasswordRequestDto  => ({
    password: props.password,
  })

}
