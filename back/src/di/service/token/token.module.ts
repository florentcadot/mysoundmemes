import { Module } from '@nestjs/common';
import { tokenToken } from './token.token';
import { RealTokenService } from '../../../adapter/secondary/service/token/real.token.service';
import {ConfigService} from '@nestjs/config'


@Module({
  providers: [
    {
      provide   : tokenToken,
      useFactory: (configService) => new RealTokenService(configService),
      inject: [
        ConfigService
      ]
    },
  ],
  exports:[tokenToken]
})
export class TokenModule {
}
