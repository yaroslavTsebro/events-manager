import { Inject } from '@nestjs/common';
import { Dao } from './abstract.dao';
import { DbClient } from '../db-client.service';
import { AuthProvider } from 'src/shared/dto/entities/auth-provider';

export class AuthProviderDao extends Dao<AuthProvider> {
  constructor(@Inject(DbClient) dataSource: DbClient) {
    super(AuthProvider, dataSource);
  }
}
