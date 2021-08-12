import { NotifierType } from 'src/app/core/domain/notifier-type'

export type NotifierService = {
  open(props: { message: string, type: NotifierType}): void
}
