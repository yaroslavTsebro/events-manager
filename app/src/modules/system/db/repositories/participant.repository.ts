import { BadRequestException, ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ParticipantDao } from '../dao/participant.dao';
import { Participant } from 'src/shared/dto/entities/participant';
import { ParticipantRole } from 'src/shared/contracts/entities/participant';
import { User } from 'src/shared/dto/entities/user';
import { Event } from 'src/shared/dto/entities/event';
import { DbClient } from '../db-client.service';

@Injectable()
export class ParticipantRepository {
  constructor(
    private readonly dao: ParticipantDao,
    @Inject(DbClient) private readonly dataSource: DbClient
  ) { }

  async findByUserAndEvent(userId: number, eventId: number) {
    return this.dao.findOneBy({ user: { id: userId }, event: { id: eventId } })
  }

  async create(dto: Participant): Promise<Participant> {
    const participant = this.dao.create({ ...dto });

    return this.dao.save(participant);
  }

  async remove(participationId: number): Promise<Participant> {
    return this.dao.remove({ id: participationId } as Participant);
  }

  async cancelParticipation(eventId: number, user: User): Promise<Participant> {
    return await this.dataSource.transaction(async (manager) => {
      const eventRepository = manager.getRepository(Event);
      const participantRepository = manager.getRepository(Participant);

      const participant = await participantRepository.findOne({
        where: { user: { id: user.id }, event: { id: eventId } },
      });

      if (!participant) {
        throw new ForbiddenException('You are not allowed to do this action');
      }

      await participantRepository.remove(participant);

      const event = await eventRepository.findOne({
        where: { id: eventId },
        lock: { mode: 'pessimistic_write' },
      });

      if (!event) {
        throw new NotFoundException(`Event with ID ${eventId} not found`);
      }

      event.currentParticipants -= 1;
      await eventRepository.save(event);

      return participant;
    });
  }

  async participate(eventId: number, user: User): Promise<Participant> {
    return await this.dataSource.transaction(async (manager) => {
      const eventRepository = manager.getRepository(Event);
      const participantRepository = manager.getRepository(Participant);

      const event = await eventRepository.findOne({
        where: { id: eventId },
        lock: { mode: 'pessimistic_write' },
      });

      if (!event) {
        throw new NotFoundException(`Event with ID ${eventId} not found`);
      }

      const existingParticipant = await participantRepository.findOne({
        where: { user: { id: user.id }, event: { id: eventId } },
      });

      if (existingParticipant) {
        throw new BadRequestException('User is already participating in this event');
      }

      if (event.currentParticipants >= event.maxParticipants) {
        throw new BadRequestException('Event has reached maximum number of participants');
      }

      const participant = participantRepository.create({
        event: { id: eventId } as Event,
        user: { id: user.id } as User,
        role: ParticipantRole.VISITOR,
      });

      await participantRepository.save(participant);

      event.currentParticipants += 1;
      await eventRepository.save(event);

      return participant;
    });
  }

}
