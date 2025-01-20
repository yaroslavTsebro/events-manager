import { IAuthProvider, AuthProviderType } from 'src/shared/contracts/entities/auth-provider';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { User } from '../user';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class AuthProvider implements IAuthProvider {
  @ApiProperty({ description: 'AuthProvider ID', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'AuthProvider type', enum: AuthProviderType })
  @Column({ type: 'enum', enum: AuthProviderType })
  type: AuthProviderType;

  @ApiProperty({ description: 'Payload for authentication', example: 'some-payload-data' })
  @Column()
  payload: string;

  @ApiProperty({ description: 'Associated user', type: () => User })
  @OneToOne(() => User, (user) => user.authProvider)
  user: User;
}