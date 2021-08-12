import { Board } from 'src/app/core/domain/board/board'
import { CreateBoardForm } from 'src/app/core/domain/board/create-board-form'
import { UpdateBoardForm } from 'src/app/core/domain/board/update-board-form'
import { BoardSound } from 'src/app/core/domain/board/board-sound'
import { CreateBoardSoundForm } from 'src/app/core/domain/board/create-board-sound-form'
import { UpdateBoardSoundForm } from 'src/app/core/domain/board/update-board-sound.form'
import { GetBoardSoundListForm } from 'src/app/core/domain/board/get-board-sound-list-form'

export type BoardRepository = {
  createBoard(props: CreateBoardForm): Promise<Board>
  getBoardList(): Promise<Board[]>
  getBoard(id: string): Promise<Board>
  updateBoard(props: UpdateBoardForm): Promise<Board>
  deleteBoard(id: string): Promise<void>
  createBoardSound(props: CreateBoardSoundForm): Promise<BoardSound>
  getBoardSoundList(props: GetBoardSoundListForm): Promise<BoardSound[]>
  updateBoardSound(props: UpdateBoardSoundForm): Promise<BoardSound>
  deleteBoardSound(id: string): Promise<void>
}
