import { UserRepository } from 'src/app/core/port/repository/user.repository.port'
import { RealSharedRepository }
  from 'src/app/adapter/secondary/repository/shared/real.shared.repository'
import { LoginUserForm } from 'src/app/core/domain/user/login-user-form'
import { LoginUserResponse } from 'src/app/core/domain/user/login-user-response'
import { LoginUserMapper } from 'src/app/adapter/mapper/user/login-user.mapper'
import { injectable } from 'inversify'
import { GetUserProfileForm } from 'src/app/core/domain/user/get-user-profile-form'
import { User } from 'src/app/core/domain/user/user'
import { GetUserProfileMapper } from 'src/app/adapter/mapper/user/get-user-profile.mapper'
import { GetUserProfileResponseDto } from 'src/app/adapter/secondary/dto/user/get-user-profile.dto'
import { LoginUserResponseDto } from 'src/app/adapter/secondary/dto/user/login-user.dto'
import { ActivateUserForm } from 'src/app/core/domain/user/activate-user-form'
import { SignupUserForm } from 'src/app/core/domain/user/signup-user-form'
import { SignupUserMapper } from 'src/app/adapter/mapper/user/signup-user.mapper'
import { UpdateUserForm } from 'src/app/core/domain/user/update-user-form'
import { UpdateUserResponseDto } from 'src/app/adapter/secondary/dto/user/update-user.dto'
import { UpdateUserMapper } from 'src/app/adapter/mapper/user/update-user.mapper'
import { ForgetPasswordUserForm } from 'src/app/core/domain/user/forget-password-user-form'
import { ForgetPasswordUserMapper } from 'src/app/adapter/mapper/user/forget-password-user.mapper'
import { ResetUserPasswordForm } from 'src/app/core/domain/user/reset-user-password-form'
import { ResetUserPasswordMapper } from 'src/app/adapter/mapper/user/reset-user-password.mapper'

@injectable()
export class RealUserRepository extends RealSharedRepository implements UserRepository {
  async login (props: LoginUserForm): Promise<LoginUserResponse> {
    const response = await this.instance.post<LoginUserResponseDto>(
      '/auth/login',
      LoginUserMapper.toRepository(props),
    )

    return LoginUserMapper.toDomainResponse(response.data)
  }

  async signup (props: SignupUserForm): Promise<void> {
    await this.instance.post('/user/signup', SignupUserMapper.toRepository(props))
  }

  async getUserProfile (props: GetUserProfileForm): Promise<User> {
    const response = await this.instance.post<GetUserProfileResponseDto>(
      '/user/profile',
      GetUserProfileMapper.toRepository(props),
    )
    return GetUserProfileMapper.toDomainResponse(response.data)
  }

  async activateUser (props: ActivateUserForm): Promise<void> {
    await this.instance.post<boolean>(`/user/activate-account/${props.activationToken}`)
  }

  async updateUser (props: UpdateUserForm): Promise<User> {
    const response = await this.instance.patch<UpdateUserResponseDto>(
      '/user',
      UpdateUserMapper.toRepository(props),
    )
    return UpdateUserMapper.toDomainResponse(response.data)
  }

  async forgetPasswordUser (props: ForgetPasswordUserForm): Promise<void> {
    await this.instance.post<void>(
      '/user/forget-password',
      ForgetPasswordUserMapper.toRepository(props),
    )
  }

  async resetUserPassword (props: ResetUserPasswordForm): Promise<void> {
    await this.instance.post<void>(
      `/user/password/${props.token}`,
      ResetUserPasswordMapper.toRepository(props),
    )
  }
}
