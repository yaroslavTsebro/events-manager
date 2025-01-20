import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { DbModule } from '../system/db/db.module';
import { EventController } from './event.controller';

@Module({
  imports: [DbModule],
  providers: [EventService],
  controllers: [EventController]
})
export class EventModule {}
