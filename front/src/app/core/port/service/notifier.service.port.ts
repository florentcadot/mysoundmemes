import { NotifierType } from 'src/app/core/domain/notifier-type';

export interface NotifierService {
  open(props: { message: string, type: NotifierType}): void
}
