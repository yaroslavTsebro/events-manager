import { UnauthorizedException } from '@nestjs/common';

export class TokenInvalidOrExpiredException extends UnauthorizedException {
  constructor() {
    super('Invalid or expired token');
  }
}