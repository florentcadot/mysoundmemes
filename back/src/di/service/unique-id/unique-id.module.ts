import { Module } from '@nestjs/common';
import { RealUniqueIdService } from '../../../adapter/secondary/service/unique-id/real.unique-id.service';
import { uniqueIdToken } from './unique-id.token';


@Module({
  providers: [
    {
      provide   : uniqueIdToken,
      useFactory: () => new RealUniqueIdService(),
    },
  ],
  exports:[uniqueIdToken]
})
export class UniqueIdModule {
}
