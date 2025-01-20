import { Injectable } from '@nestjs/common';
import { EventDao } from '../dao/event.dao';
import { CreateEventDto } from 'src/shared/dto/entities/event/create';
import { UpdateEventDto } from 'src/shared/dto/entities/event/update';
import { Event } from '../../../../shared/dto/entities/event'
import { Point } from 'src/shared/dto/entities/point';
import { FindManyOptions } from 'typeorm';
import { EventNotFoundException, InvalidUpdateException } from 'src/shared/exceptions/event';

@Injectable()
export class EventRepository {
  constructor(private readonly dao: EventDao) { }

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const { point, ...rest } = createEventDto;

    const geometry: Point = {
      type: point.type,
      coordinates: point.coordinates,
    };

    const event = this.dao.create({
      ...rest,
      point: geometry,
    });

    return this.dao.save(event);
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<[Event[], number]> {
    const skip = (page - 1) * limit;

    const findOptions: FindManyOptions<Event> = {
      skip: skip,
      take: limit,
    };

    const [data, total] = await this.dao.findAndCount(findOptions);

    return [data, total];
  }

  async findOne(id: number): Promise<Event> {
    const event = await this.dao.findOneBy({ id });

    if (!event) {
      throw new EventNotFoundException(id);
    }

    return event;
  }

  async update(id: number, updateEventDto: UpdateEventDto): Promise<Event> {
    const event = await this.dao.findOneBy({ id });

    if (!event) {
      throw new EventNotFoundException(id);
    }

    if (updateEventDto.maxParticipants !== undefined) {
      const currentParticipantsCount = event.currentParticipants;

      if (updateEventDto.maxParticipants < currentParticipantsCount) {
        throw new InvalidUpdateException(
          updateEventDto.maxParticipants,
          currentParticipantsCount,
        );
      }
    }

    if (updateEventDto.point) {
      const { type, coordinates } = updateEventDto.point;
      updateEventDto.point = {
        type,
        coordinates,
      } as Point;
    }

    Object.assign(event, updateEventDto);

    return this.dao.save(event);
  }

  async remove(id: number): Promise<void> {
    const event = await this.dao.findOneBy({ id });

    if (!event) {
      throw new EventNotFoundException(id);
    }

    await this.dao.remove(event);
  }
}
