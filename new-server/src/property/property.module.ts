import { Module } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';
import { PrismaDbModule } from '../prisma-db/prisma-db.module';
import { UploadModule } from '../upload/upload.module';

@Module({
  imports: [PrismaDbModule, UploadModule],
  controllers: [PropertyController],
  providers: [PropertyService],
})
export class PropertyModule {}
