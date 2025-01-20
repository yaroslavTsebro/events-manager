import { Injectable } from '@nestjs/common';
import { UserRepository } from '../system/db/repositories/user.repository';
import { User } from 'src/shared/dto/entities/user';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) { }

  async getUserById(id: number) {
    return this.userRepository.findById(id);
  }

  async getUserByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }

  async create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}
