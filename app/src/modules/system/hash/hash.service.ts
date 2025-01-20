import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IHashService } from 'src/shared/contracts/modules/hash';

@Injectable()
export class HashService implements IHashService{

  async hash(password: string, rounds: number = 10): Promise<string> {
    return await bcrypt.hash(password, rounds);
  }
  
  async verify(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}

