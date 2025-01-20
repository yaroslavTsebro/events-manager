import { UnauthorizedException } from '@nestjs/common';

export class UserNotFoundByEmailException extends UnauthorizedException {
  constructor(email: string) {
    super(`User with email ${email} not found.`);
  }
}