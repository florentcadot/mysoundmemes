import { UserRepository } from '../../port/repository/user.repository.port';
import { PasswordHashingService } from '../../port/service/password-hashing.service.port';
import { User } from '../../domain/user';
import { TokenService } from '../../port/service/token.service.port';
import { EmailService } from '../../port/service/email.service.port';
import { FileService } from '../../port/service/file.service.port';

interface Props {
  id: string
  firstname?: string
  lastname?: string
  email?: string
  password?: {
    old?: string
    new?: string
  }
  avatarFile?: Express.Multer.File

}

interface UpdateUserUseCase {
  execute(props: Props): Promise<User>
}

export class UpdateUser implements UpdateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private passwordHashingService: PasswordHashingService,
    private tokenService: TokenService,
    private emailService: EmailService,
    private fileService: FileService
  ) {}

  public async execute(props: Props){

    const currentUser: User = await this.userRepository.getUser({id: props.id})

    let passwordUpdated = currentUser.password

    if(props.password && props.password.old && props.password.new &&
      await this.passwordHashingService.check(props.password.old, currentUser.password)){
      passwordUpdated = await this.passwordHashingService.hash(props.password.new)
    }

    let avatarFile = currentUser.avatarFile

    if(props.avatarFile){
      if(currentUser.avatarFile){
        await this.fileService.deletePublicFile(currentUser.avatarFile.key)
      }
      avatarFile =  await this.fileService.uploadPublicFile({ dataBuffer: props.avatarFile.buffer, dataMimetype: props.avatarFile.mimetype })
    }


    return await this.userRepository.updateUser({
      id: props.id,
      firstname: props.firstname ? props.firstname : currentUser.firstname,
      lastname: props.lastname ? props.lastname : currentUser.lastname,
      email: props.email ? props.email : currentUser.email,
      password: passwordUpdated,
      avatarFile: props.avatarFile? avatarFile : currentUser.avatarFile
    })
  }


}
