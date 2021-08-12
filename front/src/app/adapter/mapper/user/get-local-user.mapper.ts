import { GetLocalUserResponseDto } from 'src/app/adapter/secondary/dto/user/get-local-user.dto';
import { GetLocalUserResponse } from 'src/app/core/domain/user/get-local-user-response';

export class GetLocalUserMapper {

  public static toDomainResponse = (props: GetLocalUserResponseDto): GetLocalUserResponse => (
    new GetLocalUserResponse({
      id: props.id,
      accessToken: props.accessToken,
      email: props.email
    }));
}
