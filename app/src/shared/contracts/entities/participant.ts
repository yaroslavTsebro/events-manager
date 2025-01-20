import { IEvent } from './event';
import { IUser } from './user';

export enum ParticipantRole {
  OWNER = 'OWNER',
  VISITOR = 'VISITOR',
  ADMIN = 'ADMIN',
}

export interface IParticipant {
  id: number;
  role: ParticipantRole;
  event: IEvent;
  user: IUser;
}