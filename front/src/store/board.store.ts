import { lazyInject } from 'src/app/di/di';
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { Board } from 'src/app/core/domain/board/board';
import { CreateBoardUseCase } from 'src/app/core/use-case/board/create-board.use-case';
import { CreateBoardViewModel } from 'src/app/adapter/primary/views/view-model/board/create-board.view-model';
import { GetBoardListUseCase } from 'src/app/core/use-case/board/get-board-list.use-case';
import { GetBoardUseCase } from 'src/app/core/use-case/board/get-board.use-case';
import { UpdateBoardUseCase } from 'src/app/core/use-case/board/update-board.use-case';
import { DeleteBoardUseCase } from 'src/app/core/use-case/board/delete-board.use-case';
import { BoardSound } from 'src/app/core/domain/board/board-sound';
import { CreateBoardSoundViewModel } from 'src/app/adapter/primary/views/view-model/board/create-board-sound.view-model';
import { CreateBoardSoundUseCase } from 'src/app/core/use-case/board/create-board-sound.use-case';
import { UpdateBoardViewModel } from 'src/app/adapter/primary/views/view-model/board/update-board.view-model';
import { UpdateBoardSoundUseCase } from 'src/app/core/use-case/board/update-board-sound.use-case';
import { DeleteBoardSoundUseCase } from 'src/app/core/use-case/board/delete-board-sound.use-case';
import { UpdateBoardSoundViewModel } from 'src/app/adapter/primary/views/view-model/board/update-board-sound.view-model';
import { GetBoardSoundListUseCase } from 'src/app/core/use-case/board/get-board-sound-list.use-case';
import { CreateBoardSoundMapper } from 'src/app/adapter/mapper/board/create-board-sound.mapper';
import { UpdateBoardMapper } from 'src/app/adapter/mapper/board/update-board.mapper';
import { CreateBoardMapper } from 'src/app/adapter/mapper/board/create-board.mapper';

export interface BoardState {
  boardList: Board[]
  boardSoundList: BoardSound[]
  selectedBoard?: Board
}

@Module({
  name: 'board',
  // namespaced: true
})
export class BoardStore extends VuexModule implements BoardState {

  public boardList: Board[] = []
  public boardSoundList: BoardSound[] = []
  public selectedBoard: Board | undefined = undefined

  @lazyInject('CreateBoardUseCase') private createBoard!: CreateBoardUseCase
  @lazyInject('GetBoardListUseCase') private getBoardList!: GetBoardListUseCase
  @lazyInject('GetBoardUseCase') private getBoard!: GetBoardUseCase
  @lazyInject('UpdateBoardUseCase') private updateBoard!: UpdateBoardUseCase
  @lazyInject('DeleteBoardUseCase') private deleteBoard!: DeleteBoardUseCase

  @lazyInject('CreateBoardSoundUseCase') private createBoardSound!: CreateBoardSoundUseCase
  @lazyInject('GetBoardSoundListUseCase') private getBoardSoundList!: GetBoardSoundListUseCase
  @lazyInject('UpdateBoardSoundUseCase') private updateBoardSound!: UpdateBoardSoundUseCase
  @lazyInject('DeleteBoardSoundUseCase') private deleteBoardSound!: DeleteBoardSoundUseCase


  get boards(): Board[]{
    return this.boardList
  }

  get sounds(): BoardSound[]{
    return this.boardSoundList
  }

  get boardSelected(): Board | undefined {
    return this.selectedBoard
  }


  @Mutation
  setBoardList(boardList: Board[]){
    this.boardList = boardList
  }

  @Mutation
  setSelectedBoard(board: Board){
    this.selectedBoard = board
  }

  @Mutation
  setBoardSoundList(boardSoundList: BoardSound[]){
    this.boardSoundList = boardSoundList
  }

  @Mutation
  addBoardToList(board: Board){
    this.boardList.push(board)
  }

  //BOARD

  @Action
  async create(props: CreateBoardViewModel) {
    const board = await this.createBoard.execute(CreateBoardMapper.toDomainRequest(props))
    this.addBoardToList(board)
  }

  @Action
  async getBoards() {
    const boardList = await this.getBoardList.execute()
    this.setBoardList(boardList)
  }

  @Action
  async getBoardById(id: string) {
    await this.getBoard.execute(id)
  }

  @Action
  async update(props: UpdateBoardViewModel) {
    await this.updateBoard.execute(UpdateBoardMapper.toDomainRequest(props))
    await this.getBoards()
  }

  @Action
  async deleteBoardById(id: string) {
    await this.deleteBoard.execute(id)
    await this.getBoards()
  }

  @Action
  selectBoard(board: Board){
    this.setSelectedBoard(board)
  }

  //BOARD SOUND
  @Mutation
  setSoundList(soundList: BoardSound[]){
    this.boardSoundList = soundList
  }

  @Action
  async createSound(props: CreateBoardSoundViewModel) {
    await this.createBoardSound.execute(CreateBoardSoundMapper.toDomainRequest(props))
    await this.getSoundList(props.boardId)
  }

  @Action
  async getSoundList(boardId: string) {
    const boardSoundList = await this.getBoardSoundList.execute({ boardId })
    this.setBoardSoundList(boardSoundList)
  }

  @Action
  async updateSound(props:{ form: UpdateBoardSoundViewModel, boardId: string }) {
    await this.updateBoardSound.execute(props.form)
    await this.getSoundList(props.boardId)
  }

  @Action
  async deleteSoundById(props: BoardSound) {
    if(props.id){
      await this.deleteBoardSound.execute(props.id)
      await this.getSoundList(props.boardId)
    }
  }

}
