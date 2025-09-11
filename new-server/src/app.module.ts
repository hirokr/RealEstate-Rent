import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaDbModule } from './prisma-db/prisma-db.module';
import { TenantModule } from './tenant/tenant.module';
import { ManagerModule } from './manager/manager.module';
import { PropertyModule } from './property/property.module';
import { LeaseModule } from './lease/lease.module';
import { ApplicationModule } from './application/application.module';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    PrismaDbModule,
    AuthModule,
    UploadModule,
    TenantModule,
    ManagerModule,
    PropertyModule,
    LeaseModule,
    ApplicationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}