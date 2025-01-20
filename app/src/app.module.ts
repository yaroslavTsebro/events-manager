import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
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
    HashModule,
  ]
})
export class AppModule { }
