import { Module } from '@nestjs/common';
import { fileToken } from './file.token';
import { RealFileService } from '../../../adapter/secondary/service/file/real.file.service';
import { uniqueIdToken } from '../unique-id/unique-id.token';
import { UniqueIdModule } from '../unique-id/unique-id.module';
import {ConfigService} from '@nestjs/config'


@Module({
  imports:[UniqueIdModule],
  providers: [
    {
      provide   : fileToken,
      useFactory: (uniqueIdService, configService) => new RealFileService(uniqueIdService, configService),
      inject:[
          uniqueIdToken,
          ConfigService
      ]
    },
  ],
  exports:[fileToken]
})
export class FileModule {
}
