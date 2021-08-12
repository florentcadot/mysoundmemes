import { NestFactory } from '@nestjs/core';
import { config } from 'aws-sdk';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationModule } from './di/authentication/authentication.module';
import { UserModule } from './di/use-case/user/user.module';
import { BoardModule } from './di/use-case/board/board.module';
import { SoundModule } from './di/use-case/sound/sound.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CleaningModule } from './di/service/cleaning/cleaning.module';
import {ConfigModule, ConfigService} from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
      type: 'mongodb',
      host: 'mongodb',
      port: configService.get<number>('DATABASE_PORT'),
      username:configService.get<string>('DATABASE_USERNAME'),
      password: configService.get<string>('DATABASE_PASSWORD'),
      database: configService.get<string>('DATABASE_NAME'),
      entities: ['dist/src/adapter/secondary/typeorm/*{.ts,.js}'],
      'useUnifiedTopology': true,
      synchronize: true
      }),
      inject: [ConfigService]
    }),
    ScheduleModule.forRoot(),
    AuthenticationModule,
    UserModule,
    BoardModule,
    SoundModule,
    CleaningModule
  ],
  controllers: [],
  providers: [],
})
class AppModule {
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService)

  config.update({
    accessKeyId: configService.get<string>('AWS_ACCESS_KEY_ID'),
    secretAccessKey: configService.get<string>('AWS_SECRET_ACCESS_KEY'),
    region: configService.get<string>('AWS_REGION')
  });

  app.enableCors();

  await app.listen(configService.get<number>('BACKEND_PORT'));
}
bootstrap();
