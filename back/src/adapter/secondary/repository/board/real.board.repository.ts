import { EntityRepository, Repository } from 'typeorm';
import { BoardTypeorm } from '../../typeorm/board.typeorm';
import { Board } from '../../../../core/domain/board';
import { BoardMapper } from '../../../mapper/board.mapper';
import { BoardRepository } from '../../../../core/port/repository/board.repository.port';
import { ObjectID } from 'mongodb'

@EntityRepository(BoardTypeorm)
export class RealBoardRepository extends Repository<BoardTypeorm> implements BoardRepository {
  constructor() {
    super()
  }
  async createBoard(board: Board): Promise<Board> {
    const boardSaved = await this.save(BoardMapper.toOrmEntity(board))
    return BoardMapper.toDomainEntity(boardSaved)
  }

  async getBoardById(props: { id: string, userId: string }): Promise<Board> {
    const ormBoard = await this.findOne(props.id, {where: { userId: props.userId }})
    return BoardMapper.toDomainEntity(ormBoard)
  }

  async getBoardList(userId: string): Promise<Board[]> {
    const boardList = await this.find({ userId })
    return boardList.map(board => BoardMapper.toDomainEntity(board))
  }

  async  updateBoard(props: Partial<Board>): Promise<Board> {
    const ormBoard = await this.findOne(props.id, {where: { userId: props.userId }})
    const board = BoardMapper.toDomainEntity(ormBoard)
    const boardUpdated = new Board({
      id: board.id,
      userId: board.userId,
      title: board.title,
      color: board.color,
      avatarFile: board.avatarFile,
      ...props
    })

    const ormBoardUpdated = await this.save(BoardMapper.toOrmEntity(boardUpdated))
    return BoardMapper.toDomainEntity(ormBoardUpdated)
  }


  async deleteBoard(props: { id: string, userId: string }): Promise<string> {
    const ormBoard = await this.findOne(props.id, {where: { userId: props.userId }})
    if(ormBoard.userId === props.userId){
      await this.delete(new ObjectID(props.id))
    }
    return 'OK'
  }

  async deleteAll(){
    await this.clear()
  }


}
