import { User, UserStatus } from '../../domain/user';
import { UserRepository } from '../../port/repository/user.repository.port';
import { PasswordHashingService } from '../../port/service/password-hashing.service.port';
import { TokenService } from '../../port/service/token.service.port';
import { EmailService } from '../../port/service/email.service.port';
import { FileService } from '../../port/service/file.service.port';

interface Props {
  firstname: string
  lastname: string
  email: string
  password: string
  avatarFile?: Express.Multer.File
}

interface SignupUserUseCase {
  execute(props: Props): Promise<void>
}

export class SignupUser implements SignupUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private passwordHashingService: PasswordHashingService,
    private tokenService: TokenService,
    private emailService: EmailService,
    private fileService: FileService
  ) {}

  public async execute(props: Props){

      const existingUser = await this.userRepository.getUser({email: props.email})

      if(!existingUser){

        let avatarFile
        if(props.avatarFile){
          avatarFile =  await this.fileService.uploadPublicFile({ dataBuffer: props.avatarFile.buffer, dataMimetype: props.avatarFile.mimetype })
        }

        const user = new User({
          firstname: props.firstname,
          lastname: props.lastname,
          email: props.email,
          password: await this.passwordHashingService.hash(props.password),
          role: 'user',
          status: UserStatus.pending,
          avatarFile
        })

        await this.userRepository.createUser(user)

        const activationToken = this.tokenService.signToken({
          firstname: props.firstname,
          lastname: props.lastname,
          email: props.email
        }, '1d')

        await this.emailService.sendActivationEmail({email: props.email, name: props.firstname, activationToken})

      } else {
        throw new Error('user already exist')
      }
  }

}
