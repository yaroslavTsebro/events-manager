import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { TaskListModule } from './modules/task-list/task-list.module';
import { TaskModule } from './modules/task/task.module';
import { JwtModule } from './modules/system/jwt/jwt.module';
import { DbModule } from './modules/system/db/db.module';
import { HashModule } from './modules/system/hash/hash.module';
import { RepositoriesModule } from './modules/system/db/repositories/repositories.module';

@Module({
  imports: [
    ConfigModule,
    RepositoriesModule,
    DbModule,
    JwtModule,
    AuthModule,
    UserModule,
    TaskListModule,
    TaskModule,
    HashModule,
  ]
})
export class AppModule { }
