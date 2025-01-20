import { BadRequestException } from "@nestjs/common";

export class AuthGrantTokenExpiredException extends BadRequestException {
  constructor() {
    super('Grant token expired');
  }
}