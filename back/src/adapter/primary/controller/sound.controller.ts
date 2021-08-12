import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post, Req, UploadedFile,
  UseGuards, UseInterceptors
} from '@nestjs/common';
import { RealValidatorPipeService } from '../../secondary/service/validator-pipe/real.validator-pipe.service';
import { JwtGuard } from '../../authentication/passport-guard/jwt-guard';
import {
  createSoundToken, deleteSoundToken, getSoundListToken, updateSoundToken
} from '../../../di/use-case/sound/sound.token';
import { CreateSound } from '../../../core/use-case/sound/create-sound.use-case';
import { CreateSoundDto, CreateSoundResponseDto } from '../dto/sound/create-sound.dto';
import { SoundMapper } from '../../mapper/sound.mapper';
import { DeleteSound } from '../../../core/use-case/sound/delete-sound.use-case';
import { GetSoundList } from '../../../core/use-case/sound/get-sound-list.use-case';
import { GetSoundListDto, GetSoundListResponseDto } from '../dto/sound/get-sound-list.dto';
import { UpdateSoundDto, UpdateSoundResponseDto } from '../dto/sound/update-sound.dto';
import { UpdateSound } from '../../../core/use-case/sound/update-sound.use-case';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('/api/sound')
export class SoundController {
  constructor(
    @Inject(createSoundToken)
    private createSound: CreateSound,
    @Inject(getSoundListToken)
    private getSoundList: GetSoundList,
    @Inject(updateSoundToken)
    private updateSound: UpdateSound,
    @Inject(deleteSoundToken)
    private deleteSound: DeleteSound,
  ){}

  @Post()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('file'))
  async handleCreateSound(@Req() request, @Body(new RealValidatorPipeService()) props: CreateSoundDto, @UploadedFile() file: Express.Multer.File): Promise<CreateSoundResponseDto> {
    const sound = await this.createSound.execute({
      boardId: props.boardId,
      userId: request.user?.id,
      title: props.title,
      file: file
    })
    return SoundMapper.toCreateSoundResponseDto(sound)
  }

  @Post('list')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard)
  async handleGetSoundList(@Req() request, @Body(new RealValidatorPipeService())  props: GetSoundListDto): Promise<GetSoundListResponseDto> {
    const soundList = await this.getSoundList.execute({
      userId: request.user?.id,
      boardId: props.boardId
    })
    return SoundMapper.toGetSoundListResponseDto(soundList)
  }

  @Patch()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard)
  async handleUpdateSound(@Req() request, @Body(new RealValidatorPipeService()) props: UpdateSoundDto): Promise<UpdateSoundResponseDto> {
    const sound = await this.updateSound.execute({
     ...props,
      userId: request.user?.id,
    })
    return SoundMapper.toUpdateSoundResponseDto(sound)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard)
  async handleDeleteSound(@Req() request, @Param('id') id: string): Promise<string> {
    return await this.deleteSound.execute({id, userId: request.user?.id})
  }

}
