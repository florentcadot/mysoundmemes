import { Module, Provider } from '@nestjs/common';
import { Connection } from 'typeorm';
import {
  createBoardToken,
  getBoardToken,
  boardRepositoryToken,
  getBoardListToken,
  updateBoardToken, deleteBoardToken
} from './board.token';
import { CreateBoard } from '../../../core/use-case/board/create-board.use-case';
import { RealBoardRepository } from '../../../adapter/secondary/repository/board/real.board.repository';
import { GetBoard } from '../../../core/use-case/board/get-board.use-case';
import { BoardController } from '../../../adapter/primary/controller/board.controller';
import { GetBoardList } from '../../../core/use-case/board/get-board-list.use-case';
import { UpdateBoard } from '../../../core/use-case/board/update-board.use-case';
import { DeleteBoard } from '../../../core/use-case/board/delete-board.use-case';
import { soundRepositoryToken } from '../sound/sound.token';
import { RealSoundRepository } from '../../../adapter/secondary/repository/sound/real.sound.repository';
import { fileToken } from '../../service/file/file.token';
import { FileModule } from '../../service/file/file.module';

const repositoryProvider: Provider[] = [
  {
    provide   : boardRepositoryToken,
    useFactory: connection => connection.getCustomRepository(RealBoardRepository),
    inject    : [Connection]
  },
  {
    provide   : soundRepositoryToken,
    useFactory: connection => connection.getCustomRepository(RealSoundRepository),
    inject    : [Connection]
  },
];


const useCaseProviders: Provider[] = [
  {
    provide   : createBoardToken,
    useFactory: (boardRepository, fileService) => new CreateBoard(boardRepository, fileService),
    inject    : [boardRepositoryToken, fileToken]
  },
  {
    provide   : getBoardListToken,
    useFactory: (boardRepository) => new GetBoardList(boardRepository),
    inject    : [boardRepositoryToken]
  },
  {
    provide   : getBoardToken,
    useFactory: (boardRepository) => new GetBoard(boardRepository),
    inject    : [boardRepositoryToken]
  },
  {
    provide   : updateBoardToken,
    useFactory: (boardRepository, fileService) => new UpdateBoard(boardRepository, fileService),
    inject    : [boardRepositoryToken, fileToken]
  },
  {
    provide   : deleteBoardToken,
    useFactory: (boardRepository, soundRepository, fileService) => new DeleteBoard(boardRepository, soundRepository,  fileService),
    inject    : [boardRepositoryToken, soundRepositoryToken, fileToken]
  },
];



@Module({
  controllers: [BoardController],
  imports: [FileModule],
  providers: [
    ...repositoryProvider,
    ...useCaseProviders
  ],
  exports:[boardRepositoryToken]
})
export class BoardModule {
}
