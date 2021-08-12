import { Board } from '../../domain/board';

export interface BoardRepository {
  createBoard(props: Board): Promise<Board>
  getBoardById(props: { id: string, userId: string }): Promise<Board>
  getBoardList(userId: string): Promise<Board[]>
  updateBoard(props: Partial<Board>): Promise<Board>
  deleteBoard(props: { id: string, userId: string }): Promise<string>
  deleteAll() : Promise<void>
}
