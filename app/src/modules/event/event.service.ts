import { Injectable } from '@nestjs/common';
import { PaginationQueryDto } from 'src/shared/dto/pagination';
import { EventPaginationResult } from 'src/shared/dto/pagination/event';
import { EventRepository } from '../system/db/repositories/event.repository';
import { IUser } from 'src/shared/contracts/entities/user';
import { Event } from '../../shared/dto/entities/event'
import { CreateEventDto } from 'src/shared/dto/entities/event/create';
import { UpdateEventDto } from 'src/shared/dto/entities/event/update';
import { ParticipantRepository } from '../system/db/repositories/participant.repository';
import { Participant } from 'src/shared/dto/entities/participant';
import { User } from 'src/shared/dto/entities/user';
import { ParticipantRole } from 'src/shared/contracts/entities/participant';

@Injectable()
export class EventService {
  constructor(
    private readonly eventRepository: EventRepository,
    private readonly participantRepository: ParticipantRepository,
  ) { }

  async getAll(pagination: PaginationQueryDto): Promise<EventPaginationResult> {
    const { page, limit } = pagination;

    const [data, total] = await this.eventRepository.findAll(page, limit);

    return {
      data: data || [],
      total,
      page,
      limit,
    };
  }

  async getById(userId: number) {
    return this.eventRepository.findOne(userId);
  }

  async create(createEventDto: CreateEventDto, user: User): Promise<Event> {
    const event = await this.eventRepository.create(createEventDto);

    await this.participantRepository.create({ user, event, role: ParticipantRole.OWNER } as Participant)

    return event
  }

  async update(eventId: number, updateEventDto: UpdateEventDto): Promise<Event> {
    return this.eventRepository.update(eventId, updateEventDto);
  }

  async delete(eventId: number): Promise<Event> {
    const event = await this.eventRepository.findOne(eventId);
    await this.eventRepository.remove(eventId);
    return event;
  }
}
