import { IAuthProvider } from './auth-provider';

export interface IUser {
  id: number;
  email: string;
  name?: string;
  authProvider: IAuthProvider;
}