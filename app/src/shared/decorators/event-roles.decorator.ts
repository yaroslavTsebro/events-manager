import { SetMetadata } from '@nestjs/common';
import { ParticipantRole } from '../contracts/entities/participant';

export const EVENT_ROLES_KEY = Symbol('event_roles');

export const EventRoles = (...roles: ParticipantRole[]) => SetMetadata(EVENT_ROLES_KEY, roles);