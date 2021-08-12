import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../use-case/user/user.module';
import { Authentication } from '../../adapter/authentication/authentication';
import { LocalStrategy } from '../../adapter/authentication/passport-strategy/local-strategy';
import { AuthenticationController } from '../../adapter/primary/controller/authentication.controller';
import { PasswordHashingModule } from '../service/password-hashing/password-hashing.module';
import { JwtStrategy } from '../../adapter/authentication/passport-strategy/jwt-strategy';
import {ConfigService} from '@nestjs/config'

@Module({
  controllers: [
    AuthenticationController
  ],
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) =>({
      secret: config.get<string>('ACCESS_TOKEN_SECRET'),
      signOptions: {expiresIn: `${config.get<string>('ACCESS_TOKEN_TTL_IN_MINUTES')}m`},
    }),
      inject: [ConfigService]
    }),
    UserModule,
    PasswordHashingModule
  ],
  providers: [
    Authentication,
    LocalStrategy,
    JwtStrategy
  ],
})
export class AuthenticationModule {}

