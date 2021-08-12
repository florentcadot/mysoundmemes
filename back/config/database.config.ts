import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import { get } from 'env-var';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  host: 'localhost',
  port: get('DATABASE_PORT').asInt(),
  username: get('DATABASE_USERNAME').asString(),
  password: get('DATABASE_PASSWORD').asString(),
  database: get('DATABASE_NAME').asString(),
  entities: ['dist/src/adapter/secondary/typeorm/*{.ts,.js}'],
  'useUnifiedTopology': true,
  synchronize: true
}
