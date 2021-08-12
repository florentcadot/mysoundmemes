import { Module } from '@nestjs/common';
import { emailToken } from './email.token';
import { RealEmailService } from '../../../adapter/secondary/service/email/real.email.service';


@Module({
  providers: [
    {
      provide   : emailToken,
      useFactory: () => new RealEmailService(),
    },
  ],
  exports:[emailToken]
})
export class EmailModule {
}
