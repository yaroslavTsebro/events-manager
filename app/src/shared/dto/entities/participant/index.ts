import { ApiProperty } from '@nestjs/swagger';
import { IParticipant, ParticipantRole } from 'src/shared/contracts/entities/participant';
import { Entity, Unique, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from '../user';
import { Event } from '../event';

@Entity()
@Unique(['event', 'user'])
export class Participant implements IParticipant {
  @ApiProperty({ description: 'Participant ID', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ enum: ParticipantRole, })
  @Column({
    type: 'enum',
    enum: ParticipantRole,
    default: ParticipantRole.VISITOR,
  })
  role: ParticipantRole;

  @ApiProperty({ description: 'Associated event', type: () => Event })
  @ManyToOne(() => Event, (event) => event.participants, { onDelete: 'CASCADE' })
  event: Event;

  @ApiProperty({ description: 'Associated user', type: () => User })
  @ManyToOne(() => User, (user) => user.participants, { onDelete: 'CASCADE' })
  user: User;
}