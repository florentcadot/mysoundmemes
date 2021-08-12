import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../use-case/user/user.module';
import { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_TTL_IN_MINUTES } from '../../../config/auth.config';
import { Authentication } from '../../adapter/authentication/authentication';
import { LocalStrategy } from '../../adapter/authentication/passport-strategy/local-strategy';
import { AuthenticationController } from '../../adapter/primary/controller/authentication.controller';
import { PasswordHashingModule } from '../service/password-hashing/password-hashing.module';
import { JwtStrategy } from '../../adapter/authentication/passport-strategy/jwt-strategy';

@Module({
  controllers: [
    AuthenticationController
  ],
  imports: [
    PassportModule,
    JwtModule.register({
      secret: ACCESS_TOKEN_SECRET,
      signOptions: {expiresIn: `${ACCESS_TOKEN_TTL_IN_MINUTES}m`},
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

