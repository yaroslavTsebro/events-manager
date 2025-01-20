import { Injectable, CanActivate, ExecutionContext, BadRequestException, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ParticipantRepository } from 'src/modules/system/db/repositories/participant.repository';
import { ParticipantRole } from 'src/shared/contracts/entities/participant';
import { EVENT_ROLES_KEY } from 'src/shared/decorators/event-roles.decorator';

@Injectable()
export class EventGuard implements CanActivate {
  constructor(
    private readonly participantRepo: ParticipantRepository,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const taskListId = request.params.taskListId;

    if (!user || !taskListId) {
      throw new BadRequestException();
    }

    const requiredRoles =
      this.reflector.get<ParticipantRole[]>(
        EVENT_ROLES_KEY,
        context.getHandler(),
      ) || [];

    const participant = await this.participantRepo.findByUserAndEvent(
      user.id,
      taskListId,
    );

    if (!participant) {
      throw new ForbiddenException(`You are not allowed to perform this action`);
    }

    if (requiredRoles.length === 0) {
      return true;
    }

    if (!requiredRoles.includes(participant.role)) {
      throw new ForbiddenException(`You are not allowed to perform this action`);
    }

    return true;
  }
}