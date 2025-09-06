import { Module } from '@nestjs/common';
import { TanantService } from './tanant.service';
import { TanantController } from './tanant.controller';

@Module({
  controllers: [TanantController],
  providers: [TanantService],
})
export class TanantModule {}
