import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiQuery, ApiParam, ApiBody } from '@nestjs/swagger';
import { PaginationQueryDto } from 'src/shared/dto/pagination';
import { EventPaginationResult } from 'src/shared/dto/pagination/event';
import { AuthorizationGuard } from '../auth/guards/authorization.guard';
import { EventService } from './event.service';
import { Event } from 'src/shared/dto/entities/event';
import { IUser } from 'src/shared/contracts/entities/user';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { CreateEventDto } from 'src/shared/dto/entities/event/create';
import { UpdateEventDto } from 'src/shared/dto/entities/event/update';
import { EventGuard } from '../auth/guards/event.guard';
import { EventRoles } from 'src/shared/decorators/event-roles.decorator';
import { ParticipantRole } from 'src/shared/contracts/entities/participant';

@ApiTags('events')
@UseGuards(AuthorizationGuard)
@ApiBearerAuth()
@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) { }

  @Get()
  @ApiOperation({ summary: 'Get all events for the current user' })
  @ApiResponse({ status: 200, description: 'List of events retrieved successfully.', type: EventPaginationResult, })
  @ApiResponse({ status: 401, description: 'Unauthorized. Invalid or missing token.', })
  @ApiQuery({ name: 'page', required: false, type: Number, })
  @ApiQuery({ name: 'limit', required: false, type: Number, })
  async getAll(
    @Query() pagination: PaginationQueryDto,
  ): Promise<EventPaginationResult> {
    return this.eventService.getAll(pagination);
  }

  @Get(':eventId')
  @ApiOperation({ summary: 'Get an event by its ID' })
  @ApiParam({ name: 'eventId', description: 'Event ID', type: String })
  @ApiResponse({ status: 200, description: 'Event retrieved successfully.', type: Number })
  @ApiResponse({ status: 401, description: 'Unauthorized. Invalid or missing token.', })
  @ApiResponse({ status: 404, description: 'Project not found.' })
  async getById(
    @Param('eventId', ParseIntPipe) taskListId: number,
  ): Promise<Event> {
    return this.eventService.getById(taskListId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new event' })
  @ApiResponse({ status: 201, description: 'Event successfully created.', type: Event })
  @ApiResponse({ status: 400, description: 'Invalid request data.' })
  @ApiBody({ type: CreateEventDto })
  async create(
    @Body() createEventDto: CreateEventDto,
    @CurrentUser() user: IUser,
  ): Promise<Event> {
    return this.eventService.create(createEventDto, user);
  }

  @Patch(':eventId')
  @ApiOperation({ summary: 'Update event details' })
  @ApiParam({ name: 'eventId', description: 'Event ID', type: String, example: '1' })
  @ApiResponse({ status: 200, description: 'Event successfully updated.', type: Event })
  @ApiResponse({ status: 400, description: 'Invalid request data.' })
  @ApiResponse({ status: 403, description: 'Forbidden. Insufficient permissions.' })
  @UseGuards(EventGuard)
  @EventRoles(ParticipantRole.ADMIN, ParticipantRole.OWNER)
  @ApiBody({ type: UpdateEventDto })
  async update(
    @Param('eventId', ParseIntPipe) eventId: number,
    @Body() updateEventDto: UpdateEventDto,
  ): Promise<Event> {
    return this.eventService.update(eventId, updateEventDto);
  }

  @Delete(':eventId')
  @ApiOperation({ summary: 'Delete an event' })
  @ApiParam({ name: 'eventId', description: 'Event ID', type: String, example: '1' })
  @ApiResponse({ status: 200, description: 'Event successfully updated.', type: Event })
  @ApiResponse({ status: 400, description: 'Invalid request data.' })
  @ApiResponse({ status: 403, description: 'Forbidden. Insufficient permissions.' })
  @UseGuards(EventGuard)
  @EventRoles(ParticipantRole.OWNER)
  async delete(
    @Param('eventId', ParseIntPipe) eventId: number,
  ): Promise<Event> {
    return this.eventService.delete(eventId);
  }
}
