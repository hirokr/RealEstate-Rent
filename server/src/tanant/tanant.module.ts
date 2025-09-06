import { Module } from '@nestjs/common';
import { TanantService } from './tanant.service';
import { TanantController } from './tanant.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  
  imports: [DatabaseModule],
  controllers: [TanantController],
  providers: [TanantService],
})
export class TanantModule {}
