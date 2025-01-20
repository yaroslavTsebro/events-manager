import { UnauthorizedException } from '@nestjs/common';

export class InvalidOrExpiredTokenException extends UnauthorizedException {
  constructor() {
    super('The token is invalid or has expired');
  }
}