import { UnauthorizedException } from '@nestjs/common';

export class NoAccessTokenException extends UnauthorizedException {
  constructor() {
    super('No access token provided in headers');
  }
}
