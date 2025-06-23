import { Module } from '@nestjs/common';
import { PermisoService } from './permiso.service';
import { PermisoController } from './permiso.controller';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  controllers: [PermisoController],
  providers: [PermisoService],
  imports: [PrismaModule],
})
export class PermisoModule { }
