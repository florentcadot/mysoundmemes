import { Board } from '../../core/domain/board';
import { BoardTypeorm } from '../secondary/typeorm/board.typeorm';
import { GetBoardResponseDto } from '../primary/dto/board/get-board.dto';
import { CreateBoardResponseDto } from '../primary/dto/board/create-board.dto';
import { GetBoardListResponseDto } from '../primary/dto/board/get-board-list.dto';
import { ObjectID } from 'mongodb';
import { UpdateBoardResponseDto } from '../primary/dto/board/update-board.dto';

export class BoardMapper {

  public static toOrmEntity(domainBoard: Board): BoardTypeorm {
    const ormBoard: BoardTypeorm = new BoardTypeorm()
    if(domainBoard.id){
      ormBoard.id        =  new ObjectID(domainBoard.id)
    }
    ormBoard.userId = domainBoard.userId
    ormBoard.title  = domainBoard.title
    ormBoard.color = domainBoard.color
    ormBoard.avatarFile = domainBoard.avatarFile
    return ormBoard
  }

  public static toDomainEntity(ormBoard: BoardTypeorm): Board {
    return new Board({
      id: ormBoard.id.toString(),
      userId: ormBoard.userId,
      title: ormBoard.title,
      color: ormBoard.color,
      avatarFile: ormBoard.avatarFile
    })
  }


  public static toGetBoardResponseDto = (board: Board): GetBoardResponseDto => ({
    id: board.id,
    userId: board.userId,
    title: board.title,
    color: board.color,
    avatar: board.avatarFile?.url
  })

  public static toGetBoardListResponseDto = (boardList: Board[]): GetBoardListResponseDto[] => {
    return boardList.map(board => ({
      id: board.id,
      userId: board.userId,
      title: board.title,
      color: board.color,
      avatar: board.avatarFile?.url
      })
  )}

  public static toCreateBoardResponseDto = (board: Board): CreateBoardResponseDto => ({
    id: board.id,
    userId: board.userId,
    title: board.title,
    color: board.color,
    avatar: board.avatarFile?.url
  })

  public static toUpdateBoardResponseDto = (board: Board): UpdateBoardResponseDto => ({
    id: board.id,
    userId: board.userId,
    title: board.title,
    color: board.color,
    avatar: board.avatarFile?.url
  })

}
