import { SignupUser } from '../../src/core/use-case/user/signup-user.use-case';
import { InMemoryUserRepository } from '../../src/adapter/secondary/repository/user/in-memory.user.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { signupUserToken, userRepositoryToken } from '../../src/di/use-case/user/user.token';
import { passwordHashingToken } from '../../src/di/service/password-hashing/password-hashing.token';
import { tokenToken } from '../../src/di/service/token/token.token';
import { emailToken } from '../../src/di/service/email/email.token';
import { uniqueIdToken } from '../../src/di/service/unique-id/unique-id.token';
import { fileToken } from '../../src/di/service/file/file.token';
import { RealPasswordHashingService } from '../../src/adapter/secondary/service/password-hashing/real.password-hashing.service';
import { RealTokenService } from '../../src/adapter/secondary/service/token/real.token.service';
import { InMemoryEmailService } from '../../src/adapter/secondary/service/email/in-memory.email.service';
import { RealUniqueIdService } from '../../src/adapter/secondary/service/unique-id/real.unique-id.service';
import { RealFileService } from '../../src/adapter/secondary/service/file/real.file.service';
import {ConfigService} from '@nestjs/config'


let signupUser: SignupUser
let userRepository: InMemoryUserRepository


describe('signup user', () => {

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: userRepositoryToken,
          useFactory: () => new InMemoryUserRepository(),
        },
        {
          provide: passwordHashingToken,
          useFactory: () => new RealPasswordHashingService(),
        },
        {
          provide: tokenToken,
          useFactory: (configService) => new RealTokenService(configService),
          inject: [ConfigService]
        },
        {
          provide: emailToken,
          useFactory: (configService) => new InMemoryEmailService(configService),
          inject: [ConfigService]
        },
        {
          provide: uniqueIdToken,
          useFactory: () => new RealUniqueIdService(),
        },
        {
          provide: fileToken,
          useFactory: (uniqueIdService, configService) => new RealFileService(uniqueIdService, configService),
          inject: [uniqueIdToken, ConfigService]
        },
        {
          provide: signupUserToken,
          useFactory: (userRepository, passwordHashingService, tokenService, emailService, fileService ) => new SignupUser(userRepository, passwordHashingService, tokenService, emailService, fileService ),
          inject: [userRepositoryToken, passwordHashingToken, tokenToken, emailToken, uniqueIdToken, fileToken]
        },
      ],
    }).compile();
    signupUser = module.get<SignupUser>(signupUserToken)
    userRepository =  module.get(userRepositoryToken)
  })

  it('should return an error if user already exist', async () => {

    const user = {
      firstname: 'seraphin',
      lastname: 'andrieux',
      email: 'seraphin@gmail.com',
      password: 'maouda'
    }

    try  {
      await signupUser.execute(user)
    } catch(e){
      expect(e.message).toEqual('user already exist')
    }

  })
  it('should signup a user', async () => {

    const user = {
      firstname: 'valou',
      lastname: 'ferrari',
      email: 'valou@gmail.com',
      password: 'sergent'
    }

    try{
      await signupUser.execute(user)
      expect(userRepository.userList).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            firstname: 'valou'
          })
        ])
      )
    } catch (e){
      fail();
    }
  })
})

