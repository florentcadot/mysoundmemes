import { LocalUserRepository } from 'src/app/core/port/repository/local-user.repository.port';
import { GetLocalUserResponse } from 'src/app/core/domain/user/get-local-user-response';
import { GetLocalUserMapper } from 'src/app/adapter/mapper/user/get-local-user.mapper';
import { SetLocalUserForm } from 'src/app/core/domain/user/set-local-user-form';
import { SetLocalUserMapper } from 'src/app/adapter/mapper/user/set-local-user.mapper';
import { injectable } from 'inversify';

@injectable()
export class RealLocalUserRepository implements LocalUserRepository {

  get(): GetLocalUserResponse | null {
    const localStringUser = localStorage.getItem('user');
    if(!localStringUser){
      return null
    } else {
      return GetLocalUserMapper.toDomainResponse(JSON.parse(localStringUser))
    }
  }

  remove(): void {
    localStorage.removeItem('user')
    localStorage.removeItem('reloadFlag')
  }

  set(props: SetLocalUserForm): void {
    localStorage.setItem('user', JSON.stringify(SetLocalUserMapper.toRepository(props)))
  }

  setReloadFlag(state: boolean): void {
    localStorage.setItem('reloadFlag', state.toString())
  }

  getReloadFlag(): boolean {
    const reloadFlag = localStorage.getItem('reloadFlag')
    if(reloadFlag === 'true'){
      return true
    } else {
      return  false
    }
  }

}
