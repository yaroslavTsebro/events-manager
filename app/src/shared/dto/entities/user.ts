import { IUser } from 'src/shared/contracts/entities/user';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { AuthProvider } from './auth-provider';
import { ApiProperty } from '@nestjs/swagger';
import { Participant } from './participant';

@Entity()
export class User implements IUser {
  @ApiProperty({ description: 'User ID'})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'User email' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ description: 'User name', nullable: true })
  @Column({ nullable: true })
  name?: string;

  @OneToOne(() => AuthProvider, (authProvider) => authProvider.user, { cascade: true })
  @JoinColumn()
  authProvider: AuthProvider;

  @OneToMany(() => Participant, (participant) => participant.user)
  @JoinColumn()
  participants: Participant[];
}

