import { axiosInstance } from 'boot/axios';
import { inject, injectable } from 'inversify';
import { LocalUserRepository } from 'src/app/core/port/repository/local-user.repository.port';
import { routerInstance } from 'boot/soundboard-start';
import { NotifierService } from 'src/app/core/port/service/notifier.service.port';
import { NotifierType } from 'src/app/core/domain/notifier-type';
import { LoadingService } from 'src/app/core/port/service/loading.service.port';

@injectable()
export class RealSharedRepository {

  protected instance = axiosInstance

    constructor(
      @inject('LocalUserRepository')
      private localUserRepository: LocalUserRepository,
      @inject('NotifierService')
      private notifierService: NotifierService,
      @inject('LoadingService')
      private loadingService: LoadingService
    ) {
      this.setTokenHeader()
      this.setRequestInterceptor()
      this.setResponseInterceptor()
    }

  private setTokenHeader() {
      const localUser = this.localUserRepository.get()
      if(localUser){
        this.instance.defaults.headers = {
          'soundboard-token': localUser.accessToken,
        }
      }
  }

  private setRequestInterceptor() {
    this.instance.interceptors.request.use(
      (request) => {
        this.loadingService.show()
        return request
      },
      (error) => {
        this.loadingService.hide()
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        this.notifierService.open({message: error.response?.data.message, type: NotifierType.negative})
        throw error;
      }
    );
  }

  private setResponseInterceptor() {
    this.instance.interceptors.response.use(
      (response) => {
        this.loadingService.hide()
        return response
      },
      (error) => {
        this.loadingService.hide()
        if (error.response?.status === 401 && routerInstance && routerInstance?.currentRoute.fullPath !== '/login') {
          routerInstance?.push('/login')
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        this.notifierService.open({message: error.response?.data.message, type: NotifierType.negative})
        throw error;
      }
    );
  }

}
