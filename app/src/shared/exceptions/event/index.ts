import { HttpException, HttpStatus } from '@nestjs/common';

export class EventNotFoundException extends HttpException {
  constructor(eventId: number) {
    super(`Event with ID ${eventId} not found`, HttpStatus.NOT_FOUND);
  }
}

export class MaxParticipantsExceededException extends HttpException {
  constructor(maxParticipants: number) {
    super(
      `The event has reached its maximum number of participants (${maxParticipants}).`,
      HttpStatus.BAD_REQUEST,
    );
  }
}

export class UserAlreadyParticipatingException extends HttpException {
  constructor() {
    super('User is already participating in this event', HttpStatus.BAD_REQUEST);
  }
}

export class ForbiddenActionException extends HttpException {
  constructor() {
    super('You are not allowed to perform this action', HttpStatus.FORBIDDEN);
  }
}

export class InvalidUpdateException extends HttpException {
  constructor(maxParticipants: number, currentParticipants: number) {
    super(
      `maxParticipants (${maxParticipants}) cannot be less than currentParticipants (${currentParticipants})`,
      HttpStatus.BAD_REQUEST,
    );
  }
}