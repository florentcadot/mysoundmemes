import { SignupUserForm } from 'src/app/core/domain/user/signup-user-form';
import { SignupUserRequestDto } from 'src/app/adapter/secondary/dto/user/signup-user.dto';
import { SignupUserViewModel } from 'src/app/adapter/primary/views/view-model/user/signup-user.view-model';
import { SharedMapper } from 'src/app/adapter/mapper/shared/shared.mapper';

export class SignupUserMapper {

  public static toDomainRequest = (props: SignupUserViewModel): SignupUserForm => ({
    firstname: props.firstname,
    lastname: props.lastname,
    email: props.email,
    password: props.password,
    file: props.avatarFile
  })

  public static toRepository = (props: SignupUserForm): FormData => {
    const signupUserRequest: SignupUserRequestDto = {
      firstname: props.firstname,
      lastname: props.lastname,
      email: props.email,
      password: props.password,
      file: props.file
    }
   return  SharedMapper.toFormData(signupUserRequest)
  }

}
