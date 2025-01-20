import { Geometry } from 'typeorm';
import { IParticipant } from './participant';
import { Point } from 'src/shared/dto/entities/point';

export interface IEvent {
  id: number;
  name: string;
  description: string;
  date: number;
  point: Point;
  currentParticipants: number;
  maxParticipants: number;
  participants: IParticipant[];
}