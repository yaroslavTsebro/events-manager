import { ApiProperty } from '@nestjs/swagger';
import { IEvent } from 'src/shared/contracts/entities/event';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Index, JoinColumn } from 'typeorm';
import { Participant } from '../participant';
import { Point } from '../point';

@Entity()
export class Event implements IEvent {
  @ApiProperty({ description: 'Event ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column('text', { nullable: true })
  description?: string;

  @ApiProperty()
  @Column({ type: 'bigint' })
  date: number;

  @Column("geometry", {
    spatialFeatureType: "Point",
    srid: 4326,
  })
  @Index({ spatial: true })
  point: Point;

  @ApiProperty()
  @Column({ default: 1 })
  currentParticipants: number;

  @ApiProperty()
  @Column()
  maxParticipants: number;

  @OneToMany(() => Participant, (participant) => participant.event)
  @JoinColumn()
  participants: Participant[];
}