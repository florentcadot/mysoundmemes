import { injectable } from 'inversify';
import { LoadingService } from 'src/app/core/port/service/loading.service.port';
import { Loading, QSpinnerBars } from 'quasar';

@injectable()
export class RealLoadingService implements LoadingService {

  hide(): void {
    Loading.hide()
  }

  show(): void {
    Loading.show({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      spinner: QSpinnerBars
    })
  }

}
