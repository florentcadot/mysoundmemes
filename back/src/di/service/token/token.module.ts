import { Module } from '@nestjs/common';
import { tokenToken } from './token.token';
import { RealTokenService } from '../../../adapter/secondary/service/token/real.token.service';


@Module({
  providers: [
    {
      provide   : tokenToken,
      useFactory: () => new RealTokenService(),
    },
  ],
  exports:[tokenToken]
})
export class TokenModule {
}
