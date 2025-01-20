import { IUser } from 'src/shared/contracts/entities/user';
import { Participant } from 'src/shared/dto/entities/participant';
import { ParticipantRepository } from '../system/db/repositories/participant.repository';
import { User } from 'src/shared/dto/entities/user';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ParticipantService {
  constructor(
    private readonly participantRepository: ParticipantRepository,
  ) { }

  async participate(eventId: number, user: IUser): Promise<Participant> {
    return this.participantRepository.participate(eventId, user as User);
  }

  async cancelParticipation(eventId: number, user: IUser): Promise<Participant> {
    return this.participantRepository.cancelParticipation(eventId, user as User);
  }
}
