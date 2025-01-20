import { Inject } from '@nestjs/common';
import { Dao } from './abstract.dao';
import { DbClient } from '../db-client.service';
import { User } from 'src/shared/dto/entities/user';

export class UserDao extends Dao<User> {
  constructor(@Inject(DbClient) dataSource: DbClient) {
    super(User, dataSource);
  }
}
