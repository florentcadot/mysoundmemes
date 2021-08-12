import { CreateBoardForm } from 'src/app/core/domain/board/create-board-form';
import {
  CreateBoardRequestDto,
  CreateBoardResponseDto
} from 'src/app/adapter/secondary/dto/board/create-board.dto';
import { CreateBoardViewModel } from 'src/app/adapter/primary/views/view-model/board/create-board.view-model';
import { Board } from 'src/app/core/domain/board/board';
import { SharedMapper } from 'src/app/adapter/mapper/shared/shared.mapper';

export class CreateBoardMapper {

  public static toDomainRequest = (props: CreateBoardViewModel): CreateBoardForm => ({
    title: props.title,
    color: props.color,
    file: props.avatar
  })


  public static toRepository = (props: CreateBoardForm): FormData => {

    const createBoardRequest: CreateBoardRequestDto = {
      title: props.title,
      color: props.color,
      file: props.file? props.file : undefined,
    }
    return SharedMapper.toFormData(createBoardRequest)
  }

  public static toDomainResponse = (props: CreateBoardResponseDto): Board => (new Board({
    id: props.id,
    userId: props.userId,
    title: props.title,
    color: props.color,
    avatar: props.avatar
  }))
}
