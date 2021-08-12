import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { RealValidatorPipeService } from '../../secondary/service/validator-pipe/real.validator-pipe.service';
import { GetUserDto, GetUserProfileResponseDto } from '../dto/user/get-user.dto';
import { GetUser } from '../../../core/use-case/user/get-user.use-case';
import { UserMapper } from '../../mapper/user.mapper';
import {
  activateUserToken,
  forgetUserPasswordToken,
  getUserToken, resetUserPasswordToken,
  signupUserToken,
  updateUserToken
} from '../../../di/use-case/user/user.token';
import { JwtGuard } from '../../authentication/passport-guard/jwt-guard';
import { UpdateUser } from '../../../core/use-case/user/update-user.use-case';
import { UpdateUserDto, UpdateUserResponseDto } from '../dto/user/update-user.dto';
import { SignupUser } from '../../../core/use-case/user/signup-user.use-case';
import { SignupUserDto } from '../dto/user/signup-user.dto';
import { ActivateUser } from '../../../core/use-case/user/activate-user.use-case';
import { FileInterceptor } from '@nestjs/platform-express';
import { ForgetUserPasswordDto } from '../dto/user/forget-user-password.dto';
import { ForgetUserPassword } from '../../../core/use-case/user/forget-user-password.use-case';
import { ResetUserPasswordDto } from '../dto/user/reset-user-password.dto';
import { ResetUserPassword } from '../../../core/use-case/user/reset-user-password.use-case';
import {GetBoardResponseDto} from '../dto/board/get-board.dto'
import {BoardMapper} from '../../mapper/board.mapper'

@Controller('/api/user')
export class UserController {
  constructor(
    @Inject(getUserToken)
    private getUser: GetUser,
    @Inject(updateUserToken)
    private updateUser: UpdateUser,
    @Inject(signupUserToken)
    private signupUser: SignupUser,
    @Inject(activateUserToken)
    private activateUser: ActivateUser,
    @Inject(forgetUserPasswordToken)
    private forgetUserPassword: ForgetUserPassword,
    @Inject(resetUserPasswordToken)
      private resetUserPassword: ResetUserPassword
  ){}

  @Get('/ping')
  @HttpCode(HttpStatus.OK)
  ping(): string {
    return 'pong'
  }

  @Post('/profile')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard)
  async handleGetUserProfile(@Body(new RealValidatorPipeService()) props: GetUserDto): Promise<GetUserProfileResponseDto> {
    const user = await this.getUser.execute({
      email: props.email,
      id: props.id
    })
      return UserMapper.toGetUserProfileResponseDto(user)
  }

  @Patch()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('file'))
  async handleUpdateUser(@Req() request, @Body(new RealValidatorPipeService()) props: UpdateUserDto, @UploadedFile() file: Express.Multer.File): Promise<UpdateUserResponseDto> {
    const user = await this.updateUser.execute({
      id: request.user?.id,
      avatarFile: file,
      ...props
    })
      return UserMapper.toUpdateUserResponseDto(user)
  }

  @Post('/signup')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('file'))
  async handleSignupUser(@Body(new RealValidatorPipeService()) props: SignupUserDto, @UploadedFile() file: Express.Multer.File): Promise<void> {
    try {
      await this.signupUser.execute({
        firstname: props.firstname,
        lastname: props.lastname,
        email: props.email,
        password: props.password,
        avatarFile: file
      })
    } catch (e){
      throw new HttpException(e.message, HttpStatus.CONFLICT)
    }
  }

  @Post('/activate-account/:activationToken')
  @HttpCode(HttpStatus.OK)
  async handleActivateAccount(@Param('activationToken') activationToken: string): Promise<void> {
    await this.activateUser.execute({activationToken})
  }

  @Post('/forget-password')
  @HttpCode(HttpStatus.OK)
  async handleForgetPassword(@Body(new RealValidatorPipeService()) props: ForgetUserPasswordDto): Promise<void> {
    await this.forgetUserPassword.execute(props)
  }

  @Post('/password/:resetUserPasswordToken')
  @HttpCode(HttpStatus.OK)
  async handleResetPassword(@Param('resetUserPasswordToken') resetUserPasswordToken: string, @Body(new RealValidatorPipeService()) props: ResetUserPasswordDto): Promise<void> {
    await this.resetUserPassword.execute({
      password: props.password,
      resetUserPasswordToken
    })
  }

}
