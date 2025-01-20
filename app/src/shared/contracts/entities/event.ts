import { Geometry } from 'typeorm';
import { IParticipant } from './participant';

export interface IEvent {
  id: number;
  name: string;
  description: string;
  date: number;
  point: Geometry;
  currentParticipants: number;
  maxParticipants: number;
  participants: IParticipant[];
}