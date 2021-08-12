import { NestFactory } from '@nestjs/core';
import { config } from 'aws-sdk';
import { AWS_ACCESS_KEY_ID, AWS_REGION, AWS_SECRET_ACCESS_KEY } from '../config/bucket.config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from '../config/database.config';
import { AuthenticationModule } from './di/authentication/authentication.module';
import { UserModule } from './di/use-case/user/user.module';
import { BoardModule } from './di/use-case/board/board.module';
import { SoundModule } from './di/use-case/sound/sound.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CleaningModule } from './di/service/cleaning/cleaning.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
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

  config.update({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: AWS_REGION
  });

  app.enableCors();

  await app.listen(3000);
}
bootstrap();
