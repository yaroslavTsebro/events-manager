import { Module } from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { ParticipantController } from './participant.controller';
import { DbModule } from '../system/db/db.module';

@Module({
  imports: [DbModule],
  providers: [ParticipantService],
  controllers: [ParticipantController]
})
export class ParticipantModule {}
