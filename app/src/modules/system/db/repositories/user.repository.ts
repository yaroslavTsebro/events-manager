import { Injectable } from '@nestjs/common';
import { UserDao } from '../dao/user.dao';
import { User } from 'src/shared/dto/entities/user';

@Injectable()
export class UserRepository {
  constructor(private readonly dao: UserDao) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.dao.findOne({ where: { email }, relations: ['authProvider'] });
  }
  
  async findById(id: number): Promise<User | null> {
    return this.dao.findOne({ where: { id }, relations: ['authProvider'] });
  }

  async save(user: User): Promise<User> {
    const userEnt = this.dao.create(user);
    return this.dao.save(userEnt);
  }
}