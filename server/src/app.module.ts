import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ApplicationModule } from './application/application.module';
import { LeaseModule } from './lease/lease.module';
import { ManagerModule } from './manager/manager.module';
import { PropertyModule } from './property/property.module';
import { TanantModule } from './tanant/tanant.module';
import { LoggerModule } from './logger/logger.module';
import { PrismaModule } from './prisma/prisma.module';
import { LoggerModule } from './logger/logger.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [DatabaseModule, ApplicationModule, LeaseModule, ManagerModule, PropertyModule, TanantModule, LoggerModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
