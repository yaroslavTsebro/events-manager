import { Inject } from '@nestjs/common';
import { Event } from '../../../../shared/dto/entities/event';
import { DbClient } from '../db-client.service';
import { Dao } from './abstract.dao';

export class EventDao extends Dao<Event> {
  constructor(@Inject(DbClient) dataSource: DbClient) {
    super(Event, dataSource);
  }
}
