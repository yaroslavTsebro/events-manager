import { Injectable } from '@nestjs/common';
import { ParticipantDao } from '../dao/participant.dao';
import { Participant } from 'src/shared/dto/entities/participant';

@Injectable()
export class ParticipantRepository {
  constructor(private readonly dao: ParticipantDao) { }

  async findByUserAndEvent(userId: number, eventId: number) {
    return this.dao.findOneBy({ user: { id: userId }, event: { id: eventId } })
  }

  async create(dto: Participant): Promise<Participant> {
    const participant = this.dao.create({ ...dto });

    return this.dao.save(participant);
  }

  async remove(participationId: number): Promise<Participant> {
    return this.dao.remove({id: participationId} as Participant);
  }
}
