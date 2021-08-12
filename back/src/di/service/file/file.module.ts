import { Module } from '@nestjs/common';
import { fileToken } from './file.token';
import { RealFileService } from '../../../adapter/secondary/service/file/real.file.service';
import { uniqueIdToken } from '../unique-id/unique-id.token';
import { UniqueIdModule } from '../unique-id/unique-id.module';


@Module({
  imports:[UniqueIdModule],
  providers: [
    {
      provide   : fileToken,
      useFactory: (uniqueIdService) => new RealFileService(uniqueIdService),
      inject:[uniqueIdToken]
    },
  ],
  exports:[fileToken]
})
export class FileModule {
}
