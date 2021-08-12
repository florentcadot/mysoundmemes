import { Module, Provider } from '@nestjs/common';
import { GetUser } from '../../../core/use-case/user/get-user.use-case';
import { UserController } from '../../../adapter/primary/controller/user.controller';
import { RealUserRepository } from '../../../adapter/secondary/repository/user/real.user.repository';
import { Connection } from 'typeorm';
import {
  activateUserToken,
  forgetUserPasswordToken,
  getUserToken,
  resetUserPasswordToken,
  signupUserToken,
  updateUserToken,
  userRepositoryToken
} from './user.token';
import { UpdateUser } from '../../../core/use-case/user/update-user.use-case';
import { SignupUser } from '../../../core/use-case/user/signup-user.use-case';
import { ActivateUser } from '../../../core/use-case/user/activate-user.use-case';
import { ForgetUserPassword } from '../../../core/use-case/user/forget-user-password.use-case';
import { ResetUserPassword } from '../../../core/use-case/user/reset-user-password.use-case';
import { PasswordHashingModule } from '../../service/password-hashing/password-hashing.module';
import { passwordHashingToken } from '../../service/password-hashing/password-hashing.token';
import { tokenToken } from '../../service/token/token.token';
import { TokenModule } from '../../service/token/token.module';
import { EmailModule } from '../../service/email/email.module';
import { FileModule } from '../../service/file/file.module';
import { emailToken } from '../../service/email/email.token';
import { fileToken } from '../../service/file/file.token';

const repositoryProvider: Provider[] = [
  {
    provide: userRepositoryToken,
    useFactory: connection => connection.getCustomRepository(RealUserRepository),
    inject: [Connection]
  }
];

const useCaseProviders: Provider[] = [
  {
    provide: getUserToken,
    useFactory: (userRepository) => new GetUser(userRepository),
    inject: [userRepositoryToken]
  },
  {
    provide: updateUserToken,
    useFactory: (userRepository, passwordHashingService, tokenService, emailService, fileService) => new UpdateUser(userRepository, passwordHashingService, tokenService, emailService, fileService),
    inject: [userRepositoryToken, passwordHashingToken, tokenToken, emailToken, fileToken]
  },
  {
    provide: signupUserToken,
    useFactory: (userRepository, passwordHashingService, tokenService, emailService, fileService) => new SignupUser(userRepository, passwordHashingService, tokenService, emailService, fileService),
    inject: [userRepositoryToken, passwordHashingToken, tokenToken, emailToken, fileToken]
  },
  {
    provide: activateUserToken,
    useFactory: (userRepository, tokenService) => new ActivateUser(userRepository, tokenService),
    inject: [userRepositoryToken, tokenToken]
  },
  {
    provide: forgetUserPasswordToken,
    useFactory: (userRepository, passwordHashingService, tokenService, emailService) => new ForgetUserPassword(userRepository, passwordHashingService, tokenService, emailService),
    inject: [userRepositoryToken, passwordHashingToken, tokenToken, emailToken]
  },
  {
    provide: resetUserPasswordToken,
    useFactory: (userRepository, passwordHashingService, tokenService) => new ResetUserPassword(userRepository, tokenService, passwordHashingService),
    inject: [userRepositoryToken, passwordHashingToken, tokenToken]
  }

];


@Module({
  controllers: [UserController],
  imports: [PasswordHashingModule, TokenModule, EmailModule, FileModule],
  providers: [
    ...repositoryProvider,
    ...useCaseProviders
  ],
  exports: [userRepositoryToken]
})
export class UserModule {
}
