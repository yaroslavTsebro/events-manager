import { Global, Module } from '@nestjs/common';
import { DbClient } from './db-client.service';
import { ConfigModule } from '@nestjs/config';
import { AuthProviderDao } from './dao/auth-provider.dao';
import { UserDao } from './dao/user.dao';

const daos = [
  AuthProviderDao,
  UserDao,
];


@Global()
@Module({
  imports: [ConfigModule], 
  exports: [...daos],
  providers: [DbClient, ...daos]
})
export class DbModule {}
