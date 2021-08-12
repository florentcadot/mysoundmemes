import { LoginUserResponse } from 'src/app/core/domain/user/login-user-response';
import { LoginUserForm } from 'src/app/core/domain/user/login-user-form';
import { GetUserProfileForm } from 'src/app/core/domain/user/get-user-profile-form';
import { User } from 'src/app/core/domain/user/user';
import { ActivateUserForm } from 'src/app/core/domain/user/activate-user-form';
import { SignupUserForm } from 'src/app/core/domain/user/signup-user-form';
import { UpdateUserForm } from 'src/app/core/domain/user/update-user-form';
import { ForgetPasswordUserForm } from 'src/app/core/domain/user/forget-password-user-form';
import { ResetUserPasswordForm } from 'src/app/core/domain/user/reset-user-password-form';

export interface UserRepository {
  signup(props: SignupUserForm): Promise<void>
  login(props: LoginUserForm): Promise<LoginUserResponse>
  getUserProfile(props: GetUserProfileForm): Promise<User>
  activateUser(props: ActivateUserForm): Promise<void>
  updateUser(props: UpdateUserForm): Promise<User>
  forgetPasswordUser(props: ForgetPasswordUserForm): Promise<void>
  resetUserPassword(props: ResetUserPasswordForm): Promise<void>
}
