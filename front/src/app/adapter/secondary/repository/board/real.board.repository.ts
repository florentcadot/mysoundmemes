import { RealSharedRepository } from 'src/app/adapter/secondary/repository/shared/real.shared.repository';
import { BoardRepository } from 'src/app/core/port/repository/board.repository.port';
import { Board } from 'src/app/core/domain/board/board';
import { CreateBoardForm } from 'src/app/core/domain/board/create-board-form';
import { CreateBoardMapper } from 'src/app/adapter/mapper/board/create-board.mapper';
import { CreateBoardResponseDto } from 'src/app/adapter/secondary/dto/board/create-board.dto';
import { GetBoardListMapper } from 'src/app/adapter/mapper/board/get-board-list.mapper';
import { GetBoardListResponseDto } from 'src/app/adapter/secondary/dto/board/get-board-list.dto';
import { GetBoardResponseDto } from 'src/app/adapter/secondary/dto/board/get-board.dto';
import { GetBoardMapper } from 'src/app/adapter/mapper/board/get-board.mapper';
import { UpdateBoardResponseDto } from 'src/app/adapter/secondary/dto/board/update-board.dto';
import { UpdateBoardMapper } from 'src/app/adapter/mapper/board/update-board.mapper';
import { UpdateBoardForm } from 'src/app/core/domain/board/update-board-form';
import { BoardSound } from 'src/app/core/domain/board/board-sound';
import { CreateBoardSoundForm } from 'src/app/core/domain/board/create-board-sound-form';
import { CreateBoardSoundResponseDto } from 'src/app/adapter/secondary/dto/board/create-board-sound.dto';
import { CreateBoardSoundMapper } from 'src/app/adapter/mapper/board/create-board-sound.mapper';
import { UpdateBoardSoundForm } from 'src/app/core/domain/board/update-board-sound.form';
import { UpdateBoardSoundResponseDto } from 'src/app/adapter/secondary/dto/board/update-board-sound.dto';
import { UpdateBoardSoundMapper } from 'src/app/adapter/mapper/board/update-board-sound.mapper';
import { GetBoardSoundListResponseDto } from 'src/app/adapter/secondary/dto/board/get-board-sound-list.dto';
import { GetBoardSoundListMapper } from 'src/app/adapter/mapper/board/get-board-sound-list.mapper';
import { GetBoardSoundListForm } from 'src/app/core/domain/board/get-board-sound-list-form';
import { injectable } from 'inversify';

@injectable()
export class RealBoardRepository extends RealSharedRepository implements BoardRepository{

  async createBoard(props: CreateBoardForm): Promise<Board> {
    const response = await this.instance.post<CreateBoardResponseDto>('/board', CreateBoardMapper.toRepository(props))
    return CreateBoardMapper.toDomainResponse(response.data)
  }

  async getBoardList(): Promise<Board[]> {
    const response = await this.instance.post<GetBoardListResponseDto[]>('/board/list')
    return GetBoardListMapper.toDomainResponse(response.data)
  }

  async getBoard(id: string): Promise<Board> {
    const response = await this.instance.get<GetBoardResponseDto>(`/board/${id}`)
    return GetBoardMapper.toDomainResponse(response.data)
  }

  async updateBoard(props: UpdateBoardForm): Promise<Board> {
    const response = await this.instance.patch<UpdateBoardResponseDto>('/board', UpdateBoardMapper.toRepository(props))
    return UpdateBoardMapper.toDomainResponse(response.data)
  }

  async deleteBoard(id: string): Promise<void> {
    await this.instance.delete<string>(`/board/${id}`)
  }


  async createBoardSound(props: CreateBoardSoundForm): Promise<BoardSound> {
    const response = await this.instance.post<CreateBoardSoundResponseDto>('/sound', CreateBoardSoundMapper.toRepository(props))
    return CreateBoardSoundMapper.toDomainResponse(response.data)
  }


  async getBoardSoundList(props: GetBoardSoundListForm): Promise<BoardSound[]> {
    const response = await this.instance.post<GetBoardSoundListResponseDto[]>('/sound/list', GetBoardSoundListMapper.toRepository(props))
    return GetBoardSoundListMapper.toDomainResponse(response.data)
  }


  async updateBoardSound(props: UpdateBoardSoundForm): Promise<BoardSound> {
    const response = await this.instance.patch<UpdateBoardSoundResponseDto>('/sound', UpdateBoardSoundMapper.toRepository(props))
    return UpdateBoardSoundMapper.toDomainResponse(response.data)
  }

  async deleteBoardSound(id: string): Promise<void> {
    await this.instance.delete<string>(`/sound/${id}`)
  }

}
