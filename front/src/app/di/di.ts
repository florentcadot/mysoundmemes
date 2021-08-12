import 'reflect-metadata'
import { Container } from 'inversify'
import getDecorators from 'inversify-inject-decorators'
import { UserRepository } from 'src/app/core/port/repository/user.repository.port'
import { RealUserRepository }
  from 'src/app/adapter/secondary/repository/user/user/real.user.repository'
import { LoginUser, LoginUserUseCase } from 'src/app/core/use-case/user/login-user.use-case'
import { LocalUserRepository }
  from 'src/app/core/port/repository/local-user.repository.port'
import { RealLocalUserRepository }
  from 'src/app/adapter/secondary/repository/user/local-user/real.local-user.repository'
import {
  GetUserProfile,
  GetUserProfileUseCase,
} from 'src/app/core/use-case/user/get-user-profile.use-case'
import { BoardRepository } from 'src/app/core/port/repository/board.repository.port'
import { RealBoardRepository }
  from 'src/app/adapter/secondary/repository/board/real.board.repository'
import { CreateBoard, CreateBoardUseCase } from 'src/app/core/use-case/board/create-board.use-case'
import {
  GetBoardList,
  GetBoardListUseCase,
} from 'src/app/core/use-case/board/get-board-list.use-case'
import { GetBoard, GetBoardUseCase } from 'src/app/core/use-case/board/get-board.use-case'
import { UpdateBoard, UpdateBoardUseCase } from 'src/app/core/use-case/board/update-board.use-case'
import { DeleteBoard, DeleteBoardUseCase } from 'src/app/core/use-case/board/delete-board.use-case'
import {
  CreateBoardSound,
  CreateBoardSoundUseCase,
} from 'src/app/core/use-case/board/create-board-sound.use-case'
import {
  DeleteBoardSound,
  DeleteBoardSoundUseCase,
} from 'src/app/core/use-case/board/delete-board-sound.use-case'
import {
  UpdateBoardSound,
  UpdateBoardSoundUseCase,
} from 'src/app/core/use-case/board/update-board-sound.use-case'
import {
  GetBoardSoundList,
  GetBoardSoundListUseCase,
} from 'src/app/core/use-case/board/get-board-sound-list.use-case'
import {
  GetLocalUser,
  GetLocalUserUseCase,
} from 'src/app/core/use-case/user/get-local-user.use-case'
import {
  ActivateUser,
  ActivateUserUseCase,
} from 'src/app/core/use-case/user/activate-user.use-case'
import { SignupUser, SignupUserUseCase } from 'src/app/core/use-case/user/signup-user.use-case'
import { NotifierService } from 'src/app/core/port/service/notifier.service.port'
import { RealNotifierService }
  from 'src/app/adapter/secondary/service/notifier/real.notifier.service'
import { LogoutUser, LogoutUserUseCase } from 'src/app/core/use-case/user/logout-user.use-case'
import { UpdateUser, UpdateUserUseCase } from 'src/app/core/use-case/user/update-user.use-case'
import {
  RefreshAfterLogin,
  RefreshAfterLoginUseCase,
} from 'src/app/core/use-case/user/refresh-after-login.use-case'
import { LoadingService } from 'src/app/core/port/service/loading.service.port'
import { RealLoadingService } from 'src/app/adapter/secondary/service/loading/real.loading.service'
import {
  ForgetPasswordUser,
  ForgetPasswordUserUseCase,
} from 'src/app/core/use-case/user/forget-password-user.use-case'
import {
  ResetUserPassword,
  ResetUserPasswordUseCase,
} from 'src/app/core/use-case/user/reset-user-password.use-case'

const container = new Container()

container
  .bind<UserRepository>('UserRepository')
  .to(RealUserRepository)
  .inSingletonScope()
container
  .bind<LocalUserRepository>('LocalUserRepository')
  .to(RealLocalUserRepository)
  .inSingletonScope()
container
  .bind<BoardRepository>('BoardRepository')
  .to(RealBoardRepository)
  .inSingletonScope()
container
  .bind<NotifierService>('NotifierService')
  .to(RealNotifierService)
  .inSingletonScope()
container
  .bind<LoadingService>('LoadingService')
  .to(RealLoadingService)
  .inSingletonScope()


container
  .bind<LoginUserUseCase>('LoginUserUseCase')
  .to(LoginUser)
  .inSingletonScope()
container
  .bind<LogoutUserUseCase>('LogoutUserUseCase')
  .to(LogoutUser)
  .inSingletonScope()
container
  .bind<SignupUserUseCase>('SignupUserUseCase')
  .to(SignupUser)
  .inSingletonScope()
container
  .bind<GetUserProfileUseCase>('GetUserProfileUseCase')
  .to(GetUserProfile)
  .inSingletonScope()
container
  .bind<GetLocalUserUseCase>('GetLocalUserUseCase')
  .to(GetLocalUser)
  .inSingletonScope()
container
  .bind<RefreshAfterLoginUseCase>('RefreshAfterLoginUseCase')
  .to(RefreshAfterLogin)
  .inSingletonScope()
container
  .bind<ActivateUserUseCase>('ActivateUserUseCase')
  .to(ActivateUser)
  .inSingletonScope()
container
  .bind<UpdateUserUseCase>('UpdateUserUseCase')
  .to(UpdateUser)
  .inSingletonScope()
container
  .bind<ForgetPasswordUserUseCase>('ForgetPasswordUserUseCase')
  .to(ForgetPasswordUser)
  .inSingletonScope()
container
  .bind<ResetUserPasswordUseCase>('ResetUserPasswordUseCase')
  .to(ResetUserPassword)
  .inSingletonScope()


container
  .bind<CreateBoardUseCase>('CreateBoardUseCase')
  .to(CreateBoard)
  .inSingletonScope()
container
  .bind<GetBoardListUseCase>('GetBoardListUseCase')
  .to(GetBoardList)
  .inSingletonScope()
container
  .bind<GetBoardUseCase>('GetBoardUseCase')
  .to(GetBoard)
  .inSingletonScope()
container
  .bind<UpdateBoardUseCase>('UpdateBoardUseCase')
  .to(UpdateBoard)
  .inSingletonScope()
container
  .bind<DeleteBoardUseCase>('DeleteBoardUseCase')
  .to(DeleteBoard)
  .inSingletonScope()

container
  .bind<CreateBoardSoundUseCase>('CreateBoardSoundUseCase')
  .to(CreateBoardSound)
  .inSingletonScope()
container
  .bind<GetBoardSoundListUseCase>('GetBoardSoundListUseCase')
  .to(GetBoardSoundList)
  .inSingletonScope()
container
  .bind<UpdateBoardSoundUseCase>('UpdateBoardSoundUseCase')
  .to(UpdateBoardSound)
  .inSingletonScope()
container
  .bind<DeleteBoardSoundUseCase>('DeleteBoardSoundUseCase')
  .to(DeleteBoardSound)
  .inSingletonScope()

const { lazyInject } = getDecorators(container)
export { lazyInject, container }
