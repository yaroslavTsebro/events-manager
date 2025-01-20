import { Global, Module } from '@nestjs/common';
import { DbClient } from './db-client.service';
import { ConfigModule } from '@nestjs/config';
import { AuthProviderDao } from './dao/auth-provider.dao';
import { UserDao } from './dao/user.dao';
import { EventDao } from './dao/event.dao';
import { ParticipantDao } from './dao/participant.dao';

const daos = [
  AuthProviderDao,
  UserDao,
  EventDao,
  ParticipantDao,
];


@Global()
@Module({
  imports: [ConfigModule], 
  exports: [...daos],
  providers: [DbClient, ...daos]
})
export class DbModule {}
