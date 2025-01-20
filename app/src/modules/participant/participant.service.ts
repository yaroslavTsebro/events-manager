import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { ParticipantRole } from 'src/shared/contracts/entities/participant';
import { IUser } from 'src/shared/contracts/entities/user';
import { Participant } from 'src/shared/dto/entities/participant';
import { EventRepository } from '../system/db/repositories/event.repository';
import { ParticipantRepository } from '../system/db/repositories/participant.repository';
import { Event } from 'src/shared/dto/entities/event';
import { User } from 'src/shared/dto/entities/user';

@Injectable()
export class ParticipantService {
  constructor(
    private readonly participantRepository: ParticipantRepository,
    private readonly eventRepository: EventRepository,
  ) { }

  async participate(eventId: number, user: IUser): Promise<Participant> {
    const event = await this.eventRepository.findOne(eventId);
    
    if (!event) { throw new NotFoundException(`Event with ID ${eventId} not found`); }
    
    const existingParticipant = await this.participantRepository.findByUserAndEvent(user.id, eventId);
    
    if (existingParticipant) { throw new BadRequestException('User is already participating in this event'); }
    
    if (event.currentParticipants >= event.maxParticipants) { throw new BadRequestException('Event has reached maximum number of participants'); }
    
    const participant = await this.participantRepository.create({ event: { id: eventId } as Event, user: { id: user.id } as User, role: ParticipantRole.VISITOR } as Participant);
    
    event.currentParticipants += 1;
    await this.eventRepository.update(eventId, event);
    
    return participant;
  }

  async cancelParticipation(eventId: number, user: IUser): Promise<Participant> {
    const participant = await this.participantRepository.findByUserAndEvent(eventId, user.id);
    if (!participant) { throw new ForbiddenException('You are not allowed to do this action') }

    await this.participantRepository.remove(participant.id);

    const event = await this.eventRepository.findOne(eventId);
    event.currentParticipants -= 1;

    await this.eventRepository.update(eventId, event);

    return participant;
  }
}
