import { Global, Module } from '@nestjs/common';
import { DbModule } from '../db.module';
import { UserRepository } from './user.repository';
import { AuthProviderRepository } from './auth-provider.repository';
import { EventRepository } from './event.repository';
import { ParticipantRepository } from './participant.repository';

const repositories = [
  UserRepository,
  AuthProviderRepository,
  EventRepository,
  ParticipantRepository,
];

@Global()
@Module({
  imports: [DbModule],
  providers: [...repositories],
  exports: [...repositories],
})
export class RepositoriesModule { }
