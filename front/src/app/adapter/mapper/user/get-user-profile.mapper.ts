import { GetUserProfileForm } from 'src/app/core/domain/user/get-user-profile-form'
import { GetUserProfileViewModel }
  from 'src/app/adapter/primary/views/view-model/user/get-user-profile.view-model'
import {
  GetUserProfileRequestDto,
  GetUserProfileResponseDto,
} from 'src/app/adapter/secondary/dto/user/get-user-profile.dto'
import { User } from 'src/app/core/domain/user/user'

export class GetUserProfileMapper {
  public static toDomainRequest = (props: GetUserProfileViewModel): GetUserProfileForm => ({
    email: props.email,
  })

  public static toRepository = (props: GetUserProfileForm): GetUserProfileRequestDto => ({
    email: props.email,
  })

  public static toDomainResponse = (props: GetUserProfileResponseDto): User => new User({
    id: props.id,
    firstname: props.firstname,
    lastname: props.lastname,
    email: props.email,
    role: props.role,
    avatar: props.avatar,
  })
}
