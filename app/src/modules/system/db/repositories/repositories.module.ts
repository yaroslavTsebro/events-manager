import { Global, Module } from '@nestjs/common';
import { DbModule } from '../db.module';
import { UserRepository } from './user.repository';
import { AuthProviderRepository } from './auth-provider.repository';

const repositories = [
  UserRepository,
  AuthProviderRepository,
];

@Global()
@Module({
  imports: [DbModule],
  providers: [...repositories],
  exports: [...repositories],
})
export class RepositoriesModule { }
