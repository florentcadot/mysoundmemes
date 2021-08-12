import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { lazyInject } from 'src/app/di/di'
import { LoginUserUseCase } from 'src/app/core/use-case/user/login-user.use-case'
import { User } from 'src/app/core/domain/user/user'
import { GetUserProfileUseCase } from 'src/app/core/use-case/user/get-user-profile.use-case'
import { LoginUserViewModel }
  from 'src/app/adapter/primary/views/view-model/user/login-user.view-model'
import { LoginUserMapper } from 'src/app/adapter/mapper/user/login-user.mapper'
import { GetLocalUserUseCase } from 'src/app/core/use-case/user/get-local-user.use-case'
import { ActivateUserUseCase } from 'src/app/core/use-case/user/activate-user.use-case'
import { SignupUserUseCase } from 'src/app/core/use-case/user/signup-user.use-case'
import { SignupUserViewModel }
  from 'src/app/adapter/primary/views/view-model/user/signup-user.view-model'
import { SignupUserMapper } from 'src/app/adapter/mapper/user/signup-user.mapper'
import { LogoutUserUseCase } from 'src/app/core/use-case/user/logout-user.use-case'
import { UpdateUserUseCase } from 'src/app/core/use-case/user/update-user.use-case'
import { UpdateUserViewModel }
  from 'src/app/adapter/primary/views/view-model/user/update-user.view-model'
import { UpdateUserMapper } from 'src/app/adapter/mapper/user/update-user.mapper'
import { RefreshAfterLoginUseCase } from 'src/app/core/use-case/user/refresh-after-login.use-case'
import { ForgetPasswordUserViewModel }
  from 'src/app/adapter/primary/views/view-model/user/forget-password-user.view-model'
import { ForgetPasswordUserUseCase } from 'src/app/core/use-case/user/forget-password-user.use-case'
import { ForgetPasswordUserMapper } from 'src/app/adapter/mapper/user/forget-password-user.mapper'
import { ResetUserPasswordViewModel }
  from 'src/app/adapter/primary/views/view-model/user/reset-user-password.view-model'
import { ResetUserPasswordMapper } from 'src/app/adapter/mapper/user/reset-user-password.mapper'
import { ResetUserPasswordUseCase } from 'src/app/core/use-case/user/reset-user-password.use-case'
import { routerInstance } from 'boot/soundboard-start'
import { GetLocalUserResponse } from 'src/app/core/domain/user/get-local-user-response'

export type UserState = {
  userProfile?: User
  isLogged: boolean
}

@Module({
  name: 'user',
  // namespaced: true
})
export class UserStore extends VuexModule implements UserState {
  public userProfile: User | undefined = undefined
  public localUser: GetLocalUserResponse | null | undefined = undefined
  public isLogged = false

  @lazyInject('LoginUserUseCase') private loginUser!: LoginUserUseCase
  @lazyInject('LogoutUserUseCase') private logoutUser!: LogoutUserUseCase
  @lazyInject('SignupUserUseCase') private signupUser!: SignupUserUseCase
  @lazyInject('GetUserProfileUseCase') private getUserProfile!: GetUserProfileUseCase
  @lazyInject('GetLocalUserUseCase') private getLocalUser!: GetLocalUserUseCase
  @lazyInject('ActivateUserUseCase') private activateUser!: ActivateUserUseCase
  @lazyInject('UpdateUserUseCase') private updateUser!: UpdateUserUseCase
  @lazyInject('RefreshAfterLoginUseCase') private refreshAfterLogin!: RefreshAfterLoginUseCase
  @lazyInject('ForgetPasswordUserUseCase') private forgetPassword!: ForgetPasswordUserUseCase
  @lazyInject('ResetUserPasswordUseCase') private resetUserPassword!: ResetUserPasswordUseCase


  get isUserLogged (): boolean {
    return this.isLogged
  }

  get user (): User | undefined {
    return this.userProfile
  }

  get userLocal (): GetLocalUserResponse | null | undefined {
    return this.localUser
  }

  @Mutation
  setUser (user: User) {
    this.userProfile = user
  }

  @Mutation
  setLocalUser (localUser: GetLocalUserResponse | null | undefined) {
    this.localUser = localUser
  }

  @Mutation
  setIsLogged (isLogged: boolean) {
    this.isLogged = isLogged
  }

  @Action
  async signup (props: SignupUserViewModel) {
    await this.signupUser.execute(SignupUserMapper.toDomainRequest(props))
    routerInstance?.push('/login')
  }

  @Action({ rawError: true })
  async login (props: LoginUserViewModel) {
    await this.loginUser.execute(LoginUserMapper.toDomainRequest(props))
    this.setIsLogged(true)
    routerInstance?.push('/')
  }

  @Action
  logout () {
    this.logoutUser.execute()
  }

  @Action
  async activateUserAccount (activationToken: string) {
    await this.activateUser.execute({ activationToken })
    routerInstance?.push('/login')
  }

  @Action
  async updateUserAccount (props: UpdateUserViewModel) {
    const user: User = await this.updateUser.execute(UpdateUserMapper.toDomainRequest(props))
    this.setUser(user)
  }

  @Action
  handleRefreshAfterLogin () {
    this.refreshAfterLogin.execute()
  }

  @Action
  async handleForgetPassword (props: ForgetPasswordUserViewModel) {
    await this.forgetPassword.execute(ForgetPasswordUserMapper.toDomainRequest(props))
    routerInstance?.push('/login')
  }

  @Action
  async handleResetPassword (props: ResetUserPasswordViewModel) {
    await this.resetUserPassword.execute(ResetUserPasswordMapper.toDomainRequest(props))
    routerInstance?.push('/login')
  }

  @Action
  checkIsUserLoggedIn () {
    const localUser = this.getLocalUser.execute()
    if (localUser) {
      this.setIsLogged(true)
      this.setLocalUser(localUser)
    } else {
      this.setIsLogged(false)
    }
  }

  @Action
  async handleGetUserProfile (email: string) {
    const user = await this.getUserProfile.execute({ email })
    this.setUser(user)
  }
}
