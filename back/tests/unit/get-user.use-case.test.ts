import { GetUser } from '../../src/core/use-case/user/get-user.use-case';
import { InMemoryUserRepository } from '../../src/adapter/secondary/repository/user/in-memory.user.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { getUserToken, userRepositoryToken } from '../../src/di/use-case/user/user.token';


let getUser: GetUser
let userRepository: InMemoryUserRepository


describe('get user', () => {

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: userRepositoryToken,
          useFactory: () => new InMemoryUserRepository(),
        },
        {
          provide: getUserToken,
          useFactory: (userRepository) => new GetUser(userRepository),
          inject: [userRepositoryToken]
        },
      ],
    }).compile();
    getUser = module.get(getUserToken)
    userRepository =  module.get(userRepositoryToken)
  })

  it('should get a user', async () => {
    const user = await getUser.execute({
      email: 'seraphin@gmail.com',
    })
    expect(user.lastname).toEqual('andrieux')
  })
})

