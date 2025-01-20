import { IsNotEmpty, IsString } from 'class-validator';

export class GoogleSignInPayload {
  @IsNotEmpty()
  @IsString()
  code: string;
}