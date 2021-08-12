import { SharedMapper } from 'src/app/adapter/mapper/shared/shared.mapper'
import { UpdateUserForm } from 'src/app/core/domain/user/update-user-form'
import { UpdateUserViewModel }
  from 'src/app/adapter/primary/views/view-model/user/update-user.view-model'
import {
  UpdateUserRequestDto,
  UpdateUserResponseDto,
} from 'src/app/adapter/secondary/dto/user/update-user.dto'
import { User } from 'src/app/core/domain/user/user'

export class UpdateUserMapper {
  public static toDomainRequest = (props: UpdateUserViewModel): UpdateUserForm => ({
    firstname: props.firstname,
    lastname: props.lastname,
    email: props.email,
    password: {
      old: props?.oldPassword,
      new: props?.newPassword,
    },
    file: props.file,
  })

  public static toRepository = (props: UpdateUserForm): FormData => {
    const updateUserRequest: UpdateUserRequestDto = {
      firstname: props.firstname,
      lastname: props.lastname,
      email: props.email,
      password: props.password,
      file: props.file,
    }
    return SharedMapper.toFormData(updateUserRequest)
  }

  public static toDomainResponse = (props: UpdateUserResponseDto): User => new User({
    id: props.id,
    firstname: props.firstname,
    lastname: props.lastname,
    email: props.email,
    role: props.role,
    avatar: props.avatar,
  })
}
