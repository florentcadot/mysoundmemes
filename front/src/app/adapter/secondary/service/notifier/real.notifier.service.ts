import { NotifierService } from 'src/app/core/port/service/notifier.service.port';
import { NotifierType } from 'src/app/core/domain/notifier-type';
import { Notify } from 'quasar'
import { injectable } from 'inversify';

@injectable()
export class RealNotifierService implements NotifierService {

  open(props: { message: string , type: NotifierType }): void {
    Notify.create({ message: props.message, type: props.type })
  }
}
