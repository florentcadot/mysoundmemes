import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { RealValidatorPipeService } from '../../secondary/service/validator-pipe/real.validator-pipe.service';
import { JwtGuard } from '../../authentication/passport-guard/jwt-guard';
import {
  createBoardToken,
  deleteBoardToken,
  getBoardListToken,
  getBoardToken,
  updateBoardToken
} from '../../../di/use-case/board/board.token';
import { CreateBoard } from '../../../core/use-case/board/create-board.use-case';
import { GetBoard } from '../../../core/use-case/board/get-board.use-case';
import { GetBoardList } from '../../../core/use-case/board/get-board-list.use-case';
import { CreateBoardDto, CreateBoardResponseDto } from '../dto/board/create-board.dto';
import { BoardMapper } from '../../mapper/board.mapper';
import { GetBoardListResponseDto } from '../dto/board/get-board-list.dto';
import { GetBoardResponseDto } from '../dto/board/get-board.dto';
import { UpdateBoardDto, UpdateBoardResponseDto } from '../dto/board/update-board.dto';
import { UpdateBoard } from '../../../core/use-case/board/update-board.use-case';
import { DeleteBoard } from '../../../core/use-case/board/delete-board.use-case';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('/api/board')
export class BoardController {
  constructor(
    @Inject(createBoardToken)
    private createBoard: CreateBoard,
    @Inject(getBoardListToken)
    private getBoardList: GetBoardList,
    @Inject(getBoardToken)
    private getBoard: GetBoard,
    @Inject(updateBoardToken)
    private updateBoard: UpdateBoard,
    @Inject(deleteBoardToken)
    private deleteBoard: DeleteBoard,

  ){}
  @Post()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('file'))
  async handleCreateBoard(@Req() request, @Body(new RealValidatorPipeService()) props: CreateBoardDto,  @UploadedFile() file: Express.Multer.File): Promise<CreateBoardResponseDto> {
    const board = await this.createBoard.execute({
      userId: request.user?.id,
      title: props.title,
      color: props.color,
      avatarFile: file
    })
    return BoardMapper.toCreateBoardResponseDto(board)
  }

  @Post('list')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard)
  async handleGetBoardList(@Req() request): Promise<GetBoardListResponseDto[]> {
    const boardList = await this.getBoardList.execute({
      userId: request.user?.id,
    })
    return BoardMapper.toGetBoardListResponseDto(boardList)
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard)
  async handleGetBoard(@Req() request, @Param('id') id: string): Promise<GetBoardResponseDto> {
    const board = await this.getBoard.execute({ id, userId: request.user?.id })
    return BoardMapper.toGetBoardResponseDto(board)
  }

  @Patch()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('file'))
  async handleUpdateBoard(@Req() request, @Body(new RealValidatorPipeService()) props: UpdateBoardDto,  @UploadedFile() file: Express.Multer.File): Promise<UpdateBoardResponseDto> {
    const board = await this.updateBoard.execute({
      ...props,
      userId: request.user?.id,
      avatarFile: file
    })
    return BoardMapper.toUpdateBoardResponseDto(board)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard)
  async handleDeleteBoard(@Req() request, @Param('id') id: string): Promise<string> {
    return await this.deleteBoard.execute({userId: request.user?.id, id})
  }

}
