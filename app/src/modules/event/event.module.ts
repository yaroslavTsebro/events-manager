import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { DbModule } from '../system/db/db.module';

@Module({
  imports: [DbModule],
  providers: [EventService],
  controllers: [EventController]
})
export class EventModule {}
