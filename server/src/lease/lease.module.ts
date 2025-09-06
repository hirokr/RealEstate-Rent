import { Module } from '@nestjs/common';
import { LeaseService } from './lease.service';
import { LeaseController } from './lease.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [LeaseController],
  providers: [LeaseService],
})
export class LeaseModule {}
