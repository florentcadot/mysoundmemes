import { ForgetPasswordUserViewModel }
  from 'src/app/adapter/primary/views/view-model/user/forget-password-user.view-model'
import { ForgetPasswordUserForm } from 'src/app/core/domain/user/forget-password-user-form'
import { ForgetPasswordUserRequestDto }
  from 'src/app/adapter/secondary/dto/user/forget-password-user.dto'

export class ForgetPasswordUserMapper {
  public static toDomainRequest = (props: ForgetPasswordUserViewModel): ForgetPasswordUserForm => ({
    email: props.email,
  })

  public static toRepository = (props: ForgetPasswordUserForm): ForgetPasswordUserRequestDto => ({
    email: props.email,
  })
}
