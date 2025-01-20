import { Controller, Delete, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Participant } from 'src/shared/dto/entities/participant';
import { ParticipantService } from './participant.service';
import { IUser } from 'src/shared/contracts/entities/user';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { EventGuard } from '../auth/guards/event.guard';
import { AuthorizationGuard } from '../auth/guards/authorization.guard';


@ApiTags()
@Controller()
@UseGuards(AuthorizationGuard)
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) { }

  @Post('events/:eventId/participant')
  @ApiOperation({ summary: 'Participate in an event' })
  @ApiParam({ name: 'eventId', description: 'Event ID', type: Number, example: 1 })
  @ApiResponse({ status: 201, description: 'Successfully participated in the event.', type: Participant, })
  @ApiResponse({ status: 400, description: 'Bad Request. Possible reasons: Already participating, Event is full.', })
  @ApiResponse({ status: 404, description: 'Event not found.', })
  async participate(
    @Param('eventId', ParseIntPipe) eventId: number,
    @CurrentUser() user: IUser,
  ) {
    return this.participantService.participate(eventId, user);
  }

  @Delete('events/:eventId/participant')
  @ApiOperation({ summary: 'Participate in an event' })
  @ApiParam({ name: 'eventId', description: 'Event ID', type: Number, example: 1 })
  @ApiResponse({ status: 201, description: 'Successfully canceled participation in the event.', type: Participant, })
  @ApiResponse({ status: 404, description: 'Event not found.', })
  @UseGuards(EventGuard)
  async cancelParticipation(
    @Param('eventId', ParseIntPipe) eventId: number,
    @CurrentUser() user: IUser,
  ) {
    return this.participantService.cancelParticipation(eventId, user);
  }
}
