import { IAuthProvider } from './auth-provider';
import { IParticipant } from './participant';

export interface IUser {
  id: number;
  email: string;
  name?: string;
  authProvider: IAuthProvider;
  participants: IParticipant[];
}