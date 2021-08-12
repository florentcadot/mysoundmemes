import { Module } from '@nestjs/common';
import { passwordHashingToken } from './password-hashing.token';
import { RealPasswordHashingService } from '../../../adapter/secondary/service/password-hashing/real.password-hashing.service';


@Module({
  providers: [
    {
      provide   : passwordHashingToken,
      useFactory: () => new RealPasswordHashingService(),
    },
  ],
  exports:[passwordHashingToken]
})
export class PasswordHashingModule {
}
