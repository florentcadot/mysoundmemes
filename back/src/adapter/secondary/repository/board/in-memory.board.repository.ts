import { BoardRepository } from '../../../../core/port/repository/board.repository.port';
import { Board } from '../../../../core/domain/board';
import { BoardTypeorm } from '../../typeorm/board.typeorm';
import { ObjectID } from 'mongodb';
import { BoardMapper } from '../../../mapper/board.mapper';

export class InMemoryBoardRepository implements BoardRepository {

  public boardList: BoardTypeorm[]

  constructor() {
    const ormBoard = new BoardTypeorm()
    ormBoard.id =  ObjectID('1')
    ormBoard.userId = '1'
    ormBoard.title  = 'Seraphin board title'
    ormBoard.color = '#DAF7A6'

    const ormBoard2 = new BoardTypeorm()
    ormBoard2.id =  ObjectID('2')
    ormBoard2.userId = '2'
    ormBoard2.title  = 'Valou board title'
    ormBoard2.color = '#DAF7A6'

    this.boardList= [ormBoard, ormBoard2]
  }

  async createBoard(props: Board): Promise<Board> {
    this.boardList.push(BoardMapper.toOrmEntity(props))
    return props
  }

  async getBoardById(props: { id: string; userId: string }): Promise<Board> {
    const ormBoard = this.boardList.find(ormBoard => ormBoard.id.toString() === props.id && ormBoard.userId === props.userId)
    return BoardMapper.toDomainEntity(ormBoard)
  }

  async getBoardList(userId: string): Promise<Board[]> {
    return this.boardList.map(ormBoard => BoardMapper.toDomainEntity(ormBoard))
  }

  async updateBoard(props: Partial<Board>): Promise<Board> {
    const ormBoardIndex = this.boardList.findIndex(ormBoard => ormBoard.id.toString() === props.id)
    const ormBoard = this.boardList[ormBoardIndex]
    const board = BoardMapper.toDomainEntity(ormBoard)
    const boardUpdated = new Board({
      id: board.id,
      userId: board.userId,
      title: board.title,
      color: board.color,
      avatarFile: board.avatarFile,
      ...props
    })
    this.boardList[ormBoardIndex] = BoardMapper.toOrmEntity(boardUpdated)
    return boardUpdated
  }

  async deleteBoard(props: { id: string; userId: string }): Promise<string> {
    const boardIndex = this.boardList.findIndex((ormBoard) => ormBoard.id.toString() === props.id && ormBoard.userId === props.userId )
    this.boardList.splice(boardIndex, 1)
    return 'OK'
  }

  async deleteAll(){
    this.boardList = []
  }

}
