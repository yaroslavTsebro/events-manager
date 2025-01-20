import { Inject } from '@nestjs/common';
import { DbClient } from '../db-client.service';
import { Dao } from './abstract.dao';
import { Participant } from 'src/shared/dto/entities/participant';

export class ParticipantDao extends Dao<Participant> {
  constructor(@Inject(DbClient) dataSource: DbClient) {
    super(Participant, dataSource);
  }
}
