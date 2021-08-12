import { Module } from '@nestjs/common';
import { emailToken } from './email.token';
import { RealEmailService } from '../../../adapter/secondary/service/email/real.email.service';
import {ConfigService} from '@nestjs/config'


@Module({
  providers: [
    {
      provide   : emailToken,
      useFactory: (configService) => new RealEmailService(configService),
      inject: [ConfigService]
    },
  ],
  exports:[emailToken]
})
export class EmailModule {
}
