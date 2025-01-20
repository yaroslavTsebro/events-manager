import { ApiProperty } from '@nestjs/swagger';
import { PagedData } from '.';
import { Event } from '../entities/event';

export class EventPaginationResult extends PagedData<Event> {
  @ApiProperty({ description: 'Array of events', type: () => Event, isArray: true })
  data: Event[];
}