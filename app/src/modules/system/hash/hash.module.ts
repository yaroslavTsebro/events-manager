import { Module } from '@nestjs/common';
import { HashService } from './hash.service';
import { HASH_SERVICE } from 'src/shared/contracts/modules/hash';

@Module({
  providers: [
      {
        provide: HASH_SERVICE,
        useClass: HashService
      }
    ],
    exports: [HASH_SERVICE]
})
export class HashModule {}
